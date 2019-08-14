const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const jwt= require('jsonwebtoken');
const Usuario = require('../models/usuario');
const _ = require('underscore');

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({email: body.email}, (err, usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err: {
                    message: '(Usuario) o contrasenia incorrectos'
                }
            });
        }

        if(!bcrypt.compareSync(body.password,usuarioDB.password)){//para comparar el pass que viene del body con el de la BD
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'Usuario o (contrasenia) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});
        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });
    });
});



module.exports = app;