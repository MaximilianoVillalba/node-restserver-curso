require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//TOMAR DATOS DEL POSTMAN, PARTE X-WWW-FORM-URLENCODE
app.use(bodyParser.urlencoded({ extended: false }));
//PASARLO A JSON
app.use(bodyParser.json());

//COnfiguriacion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URL,{useNewUrlParser:true, useCreateIndex:true} ,(err, res) => {
    if (err) throw err;
    else console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});