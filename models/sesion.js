var mongoose = require('mongoose');

var SesionSchema = new mongoose.Schema({
    idUsuario: String, 
    login: Object,
    logout: Object
})






module.exports = mongoose.model('Sesion', SesionSchema);