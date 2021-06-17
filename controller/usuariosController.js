const Usuarios = require('../models/Usuarios')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crea tu usuario en UpTask!'
    })
}

exports.formIniciarSesion = (req, res) => {
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion en UpTask!'
    })
}


exports.crearCuenta = async (req, res) => {
    // leer los datos
    const { email, password } = req.body;
    try {
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear una cuenta en UpTask!',
            email,
            password
        })
    }

}