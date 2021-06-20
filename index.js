const express = require('express')
const router = require('./routes/routs')
const path = require('path')
const bodyParser = require('body-parser')
const helpers = require('./helpers')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')


require('dotenv').config({ path: 'variables.env'})


const db = require('./config/db')

require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

db.sync()
    .then(() => console.log('conectado'))
    .catch(error => console.log(error))

const app = express();

app.use(express.static('public'))

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());


app.set('views', path.join(__dirname, './views'));

app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})

app.use('/', router());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
});

