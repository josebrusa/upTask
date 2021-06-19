const passport = require('passport');
const Usuarios = require('../models/Usuarios')
const crypto = require('crypto')

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

    if(!usario) {
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/reestablecer')
    }
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    await usuario.save();

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
}

exports.resetPassword = (req, res) => {
    res.json(req.params.token);
}