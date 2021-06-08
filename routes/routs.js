const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

const projectController = require('../controller/projectController')

module.exports = function() {

    router.get('/', projectController.projectHome);
    router.get('/newProject', projectController.newForm);
    router.post('/newProject',
        body('nombre').not().isEmpty().trim().escape(),
        projectController.createProject);
    router.get('/proyectos/:url', projectController.projectUrl)
    router.get('/proyecto/editar/:id', projectController.formularioEditar)



    return router;

}




