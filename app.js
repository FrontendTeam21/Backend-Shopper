let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');


let app = express();

// Bodyparser middleware
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':'false'}));



let usuarioRoutes = require('./routes/user');
let loginRoutes = require('./routes/login');
let product = require('./routes/product');
var autorizaciones = require('./routes/autorizaciones');
var sesion = require('./routes/sesion');



//Connect to DB
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/shopper', {useNewUrlParser: true})
            .then(()=>{
                console.log('Conexión ok database')
            })
            .catch(err=>{
                console.log(err);
            })


app.use(cors());




app.use('/user', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/producto', product);
app.use('/autorizaciones', autorizaciones);
app.use('/sesion', sesion);



//Server Port
app.listen(8080, ()=>{
    console.log('Servidor escuchando en http://localhost:8080');
})