let jwt = require('jsonwebtoken');

let SEED = require('../config/config').SEED;




//============================================
//MIDDLEWARE// VERIFICAR TOKEN / Lo ponemos después del obtener los usuarios porque después del token vendrán todas las operaciones que necesitarán de la validación y los permisos que el token de para poder realizarlas 
//============================================

exports.verficaToken = function(req, res, next) {

    let token = req.query.token;
    
    jwt.verify(token, SEED, (err, decoded)=>{ //decoded contien la información del usuario del payload
    
        if(err) {
            return res.status(401).json({ //401, NO autorizado
                ok: false,
                mensaje: 'Token incorrecto',
                error: err
            });
        }

        req.usuario = decoded.usuario;

        next();
        /* res.status(200).json({ 
            ok: true,
            decoded: decoded
        }); Para comprobar los datos que vienen en el decoded*/

        
    });
}


