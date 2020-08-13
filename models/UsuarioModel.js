const {Schema, model} = require('mongoose');


const UsuarioModel = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }

});


module.exports = model('Usuario', UsuarioModel);