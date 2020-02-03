/* Modelo para crear un usario. Implementar un modelo en el frontend para utilizar en el componente del Login */

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

//para menejar los roles permitidos
let rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol permitido'
};


let usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    apellido: {type: String, required: [true, 'El apellido es necesario']},
    email: {type: String, unique: true, required: [true, 'El correo es necesario']},
    password: {type: String, required: [true, 'La contraseña es necesaria']},
    img: {type: String, required: false},
    rol: {type: String, required: true, default: 'USER_ROL', enum: rolesValidos} //aqui mandamos los roles permitidos
});

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'}); 
//{PATH} para que lea la propiedad que hayamos definido como única en cada caso del error

module.exports = mongoose.model('Usuario', usuarioSchema);