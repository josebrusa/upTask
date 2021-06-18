const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.projectHome = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId: usuarioId }});
    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });
}

exports.newForm = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId: usuarioId }});
    res.render('newProject', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.createProject = async ( req, res ) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId: usuarioId }});
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un titulo a la tarea'})
    }
    if(errores.length > 0) {
        res.render('newProject', {
            nombrePagina: 'Nueva Tarea',
            errores,
            proyectos
        })
    } else {
            const usuarioId = res.locals.usuario.id;
            await Proyectos.create({ nombre, usuarioId })
            res.redirect('/')
    }
}

exports.projectUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId: usuarioId }});
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    })

    if(!proyecto) return next();
    res.render('tareas', {
        nombrePagina: 'Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId: usuarioId }});
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

    res.render('newProject', {
        nombrePagina: 'Editar Tarea',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async ( req, res ) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId: usuarioId }});
    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un titulo a la tarea'})
    }
    if(errores.length > 0) {
        res.render('newProject', {
            nombrePagina: 'Editar Tarea',
            errores,
            proyectos
        })
    }else {
            await Proyectos.update(
                { nombre: nombre },
                { where: { id: req.params.id }}
                )
            res.redirect('/')
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto }});
        if(!resultado){
            return next();
        }
            res.status(200).send('Tarea eliminada correctamente');
}