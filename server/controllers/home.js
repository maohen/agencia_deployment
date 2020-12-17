const viaje = require('../models/Viajes')
const Testimonial = require('../models/Testimoniales');
const Sequelize = require('sequelize');

exports.consultasHomePage =(req, res)=>{
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
}