/* Para otrogar permisos según el rol que se tenga. Lo hicimos con Pedro */

var express = require('express');
var app = express();



app.get('/', (req, res)=>{
    const autorizaciones = {
        permisosAdmin: [],
        permisosUser: []
               
    }

    setImmediate(()=>{/*Por si acaso, pero no es necesario*/
        try {
            res.status(200).json({
                autorizaciones: autorizaciones
            })
        } catch (error) {
            res.status(400).send(error);
        }
    })

})














module.exports = app;