// Variables en JS: var o let
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

// . = directorio actual
// desde el ., entre en routes
// lea el contenido del archivo index.js
var index = require('./routes/index');
var dht11 = require('./routes/dht11');
var photo = require('./routes/photo');
var soilmoisture = require('./routes/soilmoist');
var plants = require('./routes/plants');

var port = 8010;
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/frontend'));


// / = raiz
//app.use('/otheThings', index);
//localhost:8010/otherThings
app.use('/', index);
app.use('/', dht11);
app.use('/', photo);
app.use('/', soilmoisture);
app.use('/', plants);

// Declarar funciones en JS
/*
function miFuncion(port){
    console.log('El servidor inció en el puerto: ' + port);
};

// Arrow functions o Funcion Lambda
var mifuncion = (port) => {
    console.log('El servidor inció en el puerto: ' + port);
};
*/

app.listen(port, () => {
    console.log('El servidor inció en el puerto: ' + port);
});

