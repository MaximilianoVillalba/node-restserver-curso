const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const Usuario = require('../models/usuario');
const _ = require('underscore');

app.post('/login', (req, res) => {
    res.json({
        ok:true,
    });
});



module.exports = app;