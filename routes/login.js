let express = require('express');
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

let SEED = require('../config/config').SEED;


let app = express();

let Usuario = require('../models/user');



app.post('/', (req, res)=>{

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB)=>{

        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                error: err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas – email', //– email para saber en que punto esta fallando la verificación(quitar para producción)
                error: err
            });
        }

        if(!bcrypt.compareSync( body.password, usuarioDB.password )) {//regresa booleano

            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas – password', //– password para saber en que punto esta fallando la verificación(quitar para producción)
                error: err
            });
        }

        //Crear un Token!!!
        usuarioDB.password = ';)'; //para no enviar la contraseña en el token, ya que cogerá todos los valores del usuario de la base de datos
        
        let token = jwt.sign({usuario: usuarioDB}, SEED, {expiresIn: 14400}) //La parte naranja es el seed, la parte que hace único a nuestro token/expiresIn es la fecha de expiración de este token, en este caso 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });
});


module.exports = app;