const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'] //CON ESTO SE HACE OBLIGATORIO Y DISPARA EL MENSAJE QUE SE DEFINA EN EL CASO UE NO SE CUMPLA
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() { //ESTO SIRVE PARA SACAR AL CAMPO PASSWORD DEL JSON, NO PUDIENDO OBSERVARSE DESDE EL DOCUMENTO MISMO,
    //PERO SI DESDE LA BD. ES UNA MEDIDA DE SEGURIDAD
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);