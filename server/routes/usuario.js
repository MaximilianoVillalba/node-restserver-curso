const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const Usuario = require('../models/usuario');

const app = express();

//     nombre:   body.nombre,
//     email:    body.email,
//     password: bcrypt.hashSync(body.password, salt),
//     role:     body.role
// });

app.get('/usuario', function(req, res) {
    res.json('get Usuario LOCAL');
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    var salt = bcrypt.genSaltSync(10);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id; //PARA TOMAR LO QUE SE MANDE POR LA URL
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { //BUSQUE POR EL ID Y SI LO ENCUENTRA, QUE LO ACTUALICE

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

module.exports = app;