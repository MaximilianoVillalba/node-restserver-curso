require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//TOMAR DATOS DEL POSTMAN, PARTE X-WWW-FORM-URLENCODE
app.use(bodyParser.urlencoded({ extended: false }));
//PASARLO A JSON
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            body
        });
    }

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id; //PARA TOMAR LO QUE SE MANDE POR LA URL
    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});