const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

const projectController = require('../controller/projectController')
const tareasController = require('../controller/tareasController')
const usuariosController = require('../controller/usuariosController')
const authController = require('../controller/authController')

module.exports = function() {

    router.get('/', projectController.projectHome);
    router.get('/newProject', projectController.newForm);
    router.post('/newProject', body('nombre').not().isEmpty().trim().escape(), projectController.createProject);

    router.get('/proyectos/:url', projectController.projectUrl);

    router.get('/proyecto/editar/:id', projectController.formularioEditar);
    router.post('/newProject/:id', body('nombre').not().isEmpty().trim().escape(), projectController.actualizarProyecto);

    router.delete('/proyectos/:url', projectController.eliminarProyecto);

    router.post('/proyectos/:url', tareasController.agregarTarea);
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);



    return router;

}




