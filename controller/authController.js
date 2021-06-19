const passport = require('passport');
const Usuarios = require('../models/Usuarios')
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const enviarEmail = require('../handlers/email')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMesssge: 'Ambos campos son obligatorios'
});

exports.usuarioAutenticado = ( req, res, next ) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/iniciar-sesion')
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion')
    })
}

exports.enviarToken = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email }});

    if(!usuario) {
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/reestablecer');
    }
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    await usuario.save();

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'restablecerPassword'
    });

}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contraseña'
    })
}


exports.actualizarPassword = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/reestablecer')
    }
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    await usuario.save();

    req.flash('correcto', 'Se Actualizo tu contraseña');
    res.redirect('/iniciar-sesion');
}