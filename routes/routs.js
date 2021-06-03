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
    return router;

}




