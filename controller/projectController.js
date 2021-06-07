const Proyectos = require('../models/Proyectos')

exports.projectHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });
}

exports.newForm = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('newProject', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.createProject = async ( req, res ) => {
    const proyectos = await Proyectos.findAll();

    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un titulo'})
    }
    if(errores.length > 0) {
        res.render('newProject', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else {
        const proyectos = await Proyectos.create({ nombre })
            res.redirect('/')
    }
}

exports.projectUrl = async (req, res, next) => {
    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyecto) return next();
    // res.send('Proyecto encontrado')
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    })
}