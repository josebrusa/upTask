const express = require('express');
const router = express.Router();

const projectController = require('../controller/projectController')

module.exports = function() {

    router.get('/', projectController.projectHome);

    return router;

}




