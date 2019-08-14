const jwt = require('jsonwebtoken');

// ===================
// Verificar Token
// ===================

let verificaToken = (req, res, nclext) =>{
    let token = req.get('token');//De esta manera obtengo los headers,
    //donde token es lo que se envia por el postman

    jwt.verify(token, process.env.SEED, (err, decoded) =>{
        if(err){
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;//todo esto es el payload
        next;
    });

    
};

module.exports = {
    verificaToken
}