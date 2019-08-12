const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const Usuario = require('../models/usuario');
const _ = require('underscore');

const app = express();

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado:true}, 'nombre email role estado google img')//CON EL SEGUNDO PARAMETRO DIGO QUE TALES CAMPOS QUIEREN QUE SEAN LO QUE SE MUESTREN
        .skip(desde) //PARA SALTAR LOS PRIMEROS 5 REGISTROS
        .limit(limite) //PARA MOSTRAR LOS SIGUIENTES 5
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({estado:true}, (err, conteo) => {
                res.json({
                    ok:true,
                    usuarios,
                    cuantos:conteo
                });
            });

            res.json({
                ok: true,
                usuarios
            });
        });
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
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

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

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let cambiaEstado = {
        estado:false
    };

   //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado,{ new: true, runValidators: true }, (err, usuarioBorrado) => {


         if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                    message: `Usuario con id no fue encontrado`
                }
            });
        }

        res.json({
            ok:true,
            usuario: usuarioBorrado
        }); 
    });
});

module.exports = app;