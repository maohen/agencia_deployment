const express = require('express');
const router = express.Router();
const viaje = require('../models/Viajes')
const Testimonial = require('../models/Testimoniales');
const Viaje = require('../models/Viajes');
const Sequelize = require('sequelize');
//configurar rutas
module.exports = function(){
    router.get('/', (req, res)=>{
        const promises =[];

        promises.push(viaje.findAll({
            limit: 3,
            order: [
                [Sequelize.fn('RAND')]
              ]
        }))
        promises.push(Testimonial.findAll({
            limit: 3,
            order: [
                [Sequelize.fn('RAND')]
              ]
        }))

        const resultado = Promise.all(promises)
        
        .then(resultado => res.render('index', {
            pagina: 'Próximos Viajes',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        }))
    })

    router.get('/nosotros', (req, res)=>{
        res.render('nosotros', {
            pagina: 'Sobre nosotros'
        });
    })

    router.get('/viajes', (req, res)=>{
        viaje.findAll()
        .then(viajes => res.render('viajes', {
            pagina: 'Próximos Viajes',
            viajes
        }))
    })

    router.get('/viajes/:id', (req, res)=>{
        viaje.findByPk(req.params.id)
            .then(viaje => res.render('single-viaje', {
                viaje
            }))
            .catch(error => console.error(error))
    })

    router.get('/testimoniales', (req, res)=>{
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales',{
                pagina: 'Testimoniales',
                testimoniales
            }))
    })
    //enviar formulario testimoniales
    router.post('/testimoniales', (req, res)=>{
        let {nombre, correo, mensaje}= req.body
        let errores= []

        if(!nombre){
            errores.push({'mensaje': 'Agrega tu Nombre'})
        }
        if(!correo){
            errores.push({'mensaje': 'Agrega tu Correo'})
        }
        if(!mensaje){
            errores.push({'mensaje': 'Agrega tu Mensaje'})
        }

        if(errores.length >0){
            //muestra la vista con errores
            res.render('testimoniales',{
                errores,
                nombre,
                correo,
                mensaje
            })
        }else{
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.error(error))
        }
    })

    return router;
}