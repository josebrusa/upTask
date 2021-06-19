const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

const projectController = require('../controller/projectController')
const tareasController = require('../controller/tareasController')
const usuariosController = require('../controller/usuariosController')
const authController = require('../controller/authController')

module.exports = function() {
    // ruta home
    router.get('/', authController.usuarioAutenticado, projectController.projectHome);
    // formulario proyecto
    router.get('/newProject', authController.usuarioAutenticado, projectController.newForm);
    // nuevo proyecto
    router.post('/newProject', authController.usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), projectController.createProject);
    // listar proyecto
    router.get('/proyectos/:url', authController.usuarioAutenticado, projectController.projectUrl);
    // editar formulario
    router.get('/proyecto/editar/:id', authController.usuarioAutenticado, projectController.formularioEditar);
    // actualizar proyecto
    router.post('/newProject/:id', authController.usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), projectController.actualizarProyecto);
    // eliminar proyecto
    router.delete('/proyectos/:url', authController.usuarioAutenticado, projectController.eliminarProyecto);
    // crear tarea
    router.post('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea);
    // actualizar tarea
    router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea);
    // Eliminar tarea
    router.delete('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea);

    // crear cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    // iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);
    //restablecer contraseña
    router.get('/reestablecer', usuariosController.formReestablecerPassword);



    return router;

}




