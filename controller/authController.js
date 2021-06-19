const passport = require('passport');
const Usuarios = require('../models/Usuarios')

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
        res.render('reestablecer', {
            nombrePagina: 'Reestablecer tu contraseña',
            mensajes: req.flash()
        })
    }
    
}