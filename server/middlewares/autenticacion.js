const jwt = require('jsonwebtoken');

// ===================
// Verificar Token
// ===================

let verificaToken = (req, res, nclext) => {
    let token = req.get('token');//De esta manera obtengo los headers,
    //donde token es lo que se envia por el postman

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;//todo esto es el payload
        next();
    });


};

// ===================
// Verificar AdminRol
// ===================
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }



};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}