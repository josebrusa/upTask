exports.projectHome = (req, res) => {
    res.render('index', {
        nombrePagina : 'Proyectos'
    });
}

exports.newProject = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.createProject = ( req, res ) => {
    res.send('creaste nueva tarea')
}