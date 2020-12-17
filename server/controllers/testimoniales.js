const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimonial=  (req, res)=>{
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        }))
}

exports.agregarTestimonial= async  (req, res)=>{
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
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
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
}