const express = require('express')
const router = require('./routes/routs')
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./config/db')

require('./models/Proyectos')

db.sync()
    .then(() => console.log('conectado'))
    .catch(error => console.log(error))

const app = express();
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views'))
app.use('/', router())

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})