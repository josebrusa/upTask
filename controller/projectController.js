const Proyectos = require('../models/Proyectos')
const slug = require('slug')

exports.projectHome = (req, res) => {
    res.render('index', {
        nombrePagina : 'Proyectos'
    });
}

exports.newForm = (req, res) => {
    res.render('newProject', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.createProject = async ( req, res ) => {
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un titulo'})
    }
    if(errores.length > 0) {
        res.render('newProject', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    }else {
        const url = slug(nombre).toLowerCase();
        const proyectos = await Proyectos.create({ nombre, url })
            res.redirect('/')
    }
}