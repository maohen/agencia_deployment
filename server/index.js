const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')
let config = require('./config')

//configurar express
const app = express()

//habilitar pug
app.set('view engine', 'pug');

//Añadir vistas
app.set('views', path.join(__dirname, './views'))

//cargar carpeta static
app.use(express.static('public'))

//cargar body-parser
app.use(bodyParser.urlencoded({extended: true}))

//validar si estamos en desarrollo o produccion
config = config[app.get('env')]
//crea varble para el nombre s¡del sitio segun el ambiente
app.locals.titulo = config.nombresitio

//calcular año
app.use((req,resp,next)=>{
    const fecha = new Date();
    resp.locals.añoActual= fecha.getFullYear();
    return next();
})

//cargar rutas
app.use('/', routes())

app.listen(3000)