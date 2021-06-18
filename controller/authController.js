const passport = require('passport');

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