/* Modelo para los productos, seguramente todos los mopdelos sufran cambios porque se utilizará otro backend */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    imagePath: {type: String, required: true},
    nombre: {type: String, required: true},
    categoriaGenero: String,
    categoriaProducto: String,
    categoriaMarca: String,
    categoriaColor: String,
    categoriaTalla: String,
    precio: String,
    descripcion: String, 
    productId: Number
});

module.exports = mongoose.model('Product', ProductSchema);