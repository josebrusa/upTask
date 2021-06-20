const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crea tu usuario en UpTask!'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion en UpTask!',
        error
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
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
        const usuario = {
            email
        }
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask!',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta')
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

exports.formReestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu contraseña'
    })
}