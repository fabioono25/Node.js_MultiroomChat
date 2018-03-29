//importar os modulos
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

//view engine e vies do express
app.set('view engine', 'ejs')
app.set('views', './app/views')

//configuracao do middleware express.static
app.use(express.static('./app/public'))

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}))

//middleware do express-validator
app.use(expressValidator())

//autoload das rotas, models e controllers para app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app