let express = require('express');
let bcrypt = require('bcryptjs');


let app = express();



let Usuario = require('../models/user');


//============================================
//OBTENER TODOS LOS USUARIOS
//============================================

//Rutas //next(para que pase a la siguiente cosa)-más utilizado en los middlewares
app.get('/', (req, res, next) => {

    //le digo que busque todos los usuarios y me de solo estos parámetros y que después
    //de eso lo ejecute 
    Usuario.find({}, 'nombre email img rol')
        
        .exec(  
            (err, usuarios)=>{

                if(err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar usuarios',
                        error: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios //devuelve un arreglo de todos los usuarios
                });
            });
});

app.get('/search/:nombre', (req, res)=>{
    Usuario.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            usuarios: data
        })
    })

})

app.get('/:id', (req, res)=>{
    Usuario.findById(req.params.id, (err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        if(data === null) {
            return res.status(200).json({
                usuario: null,
                mensaje: 'El cliente ya no existe'
            })
        }
        res.status(200).json({
            usuario: data
        })
    })
})



//============================================
//CREAR UN NUEVO USUARIO
//============================================


app.post('/', (req, res)=> {

    //extraemos el body
    let body = req.body; //el body solo funcionará si tenemos 
    //primero el middleware del bodyparser


    //creamos un nuevo objeto de tipo usuario del modelo de mongoose e 
    //inicializamos cada uno de los valores
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encriptar contraseña de una sola vía
        img: body.img,
        rol: body.rol,
    });

    //lo guardamos en la base de datos
    usuario.save((err, usuarioGuardado)=>{

        //y manejamos los errores y la respuesta
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
        });
    });
});


module.exports = app;
