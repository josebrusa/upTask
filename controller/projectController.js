const Proyectos = require('../models/Proyectos')

exports.projectHome = async (req, res) => {
    const proyectos = await Proyectos.findAll()
    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
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
        const proyectos = await Proyectos.create({ nombre })
            res.redirect('/')
    }
}