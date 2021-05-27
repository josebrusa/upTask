const express = require('express')
const router = require('./routes')
const path = require('path')

const app = express();
const port = 3000

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, './views'))

app.use('/', router())


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})