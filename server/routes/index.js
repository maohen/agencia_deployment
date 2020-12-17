const express = require('express');
const router = express.Router();
//cargar controllers
const controlNosotrol = require('../controllers/nosotros');
const controlHome = require('../controllers/home');
const controlViajes = require('../controllers/viajes');
const controlTestimonial = require('../controllers/testimoniales');

//configurar rutas
module.exports = function(){
    router.get('/',controlHome.consultasHomePage )

    router.get('/nosotros', controlNosotrol.infoNosotros)

    router.get('/viajes',controlViajes.mostrarViajes)

    router.get('/viajes/:id',controlViajes.singleViaje)

    router.get('/testimoniales',controlTestimonial.mostrarTestimonial )
    //enviar formulario testimoniales
    router.post('/testimoniales',controlTestimonial.agregarTestimonial)

    return router;
}