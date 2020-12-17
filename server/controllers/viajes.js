const Viaje = require('../models/Viajes');

exports.mostrarViajes= async (req, res)=>{
    const viajes= await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    })
}

exports.singleViaje = async  (req, res)=>{
    const viaje = await Viaje.findByPk(req.params.id)
        res.render('single-viaje', {
            viaje
        })
}