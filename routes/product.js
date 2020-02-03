let express = require('express');
let Product = require('../models/product');

let app = express();

app.get('/', (req, res)=>{
    Product.find({}).exec((err, data)=>{
        if(err){
            return res.status(500).json({
                error: err
            });
        }
        res.status(200).json({
            products: data
        })
    })
})

app.get('/search/:nombre', (req, res)=>{
    Product.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            products: data
        })
    })
})
app.get('/search/:categoriaGenero', (req, res)=>{
    Product.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            products: data
        })
    })
})
app.get('/search/:categoriaProducto', (req, res)=>{
    Product.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            products: data
        })
    })
})
app.get('/search/:categoriaMarca', (req, res)=>{
    Product.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            products: data
        })
    })
})
app.get('/search/:categoriaColor', (req, res)=>{
    Product.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            products: data
        })
    })
})
app.get('/search/:precio', (req, res)=>{
    Product.find((err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            products: data
        })
    })
})

app.get('/:id', (req, res)=>{
    Product.findById(req.params.id, (err, data)=>{
        if(err) {
            return res.status(500).json({
                error: err
            })
        }
        if(data === null) {
            return res.status(200).json({
                product: null,
                mensaje: 'El producto ya no existe'
            })
        }
        res.status(200).json({
            product: data
        })
    })
})


//POST

app.post('/', (req, res)=>{
    let body = req.body;
    let product = new Product({
        imagePath: body.imagePath,
        nombre: body.nombre,
        categoriaGenero: body.categoriaGenero,
        categoriaProducto: body.categoriaProducto,
        categoriaMarca: body.categoriaMarca,
        categoriaColor: body.categoriaColor,
        categoriaTalla: body.categoriaTalla,
        precio: body.precio,
        descripcion: body.descripcion
    });
    product.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        res.status(200).json({
            mensaje: 'Producto creado correctamente'
        });
    })
})


module.exports = app;