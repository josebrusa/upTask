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

exports.createProject = ( req, res ) => {
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

    }
}