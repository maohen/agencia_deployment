const Sequelize = require('sequelize');

module.exports= new Sequelize('agencia_de_viajes_nodejs','root','root',{
    host: '127.0.0.1',
    port: '8889',
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})