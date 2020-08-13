const { response } = require('express');
const UsuarioModel = require('../models/UsuarioModel');
const { GenerarPasswordHelper, ValidarPasswordHelper } = require('../helpers/bcryptHelper');
const GenerarToken = require('../helpers/jwtHelper');
const { EnviarCorreoRecuperacionClave } = require('../helpers/envioCorreoHelper');



const CrearUsuarioController = async (req, res = response) => {

    const { email, password } = req.body;

    const usuario = await UsuarioModel.findOne({ email });

    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'ya existe un usuario con ese correo'
        });
    }

    try {
        const nuevoUsuario = await new UsuarioModel(req.body);

        nuevoUsuario.password = GenerarPasswordHelper(password);

        await nuevoUsuario.save();

        const jwt = await GenerarToken(nuevoUsuario.id, nuevoUsuario.name);

        res.status(201).json({
            ok: true,
            name: nuevoUsuario.name,
            uid: nuevoUsuario.id,
            jwt
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error del servidor'
        });
    }

};


const LoginController = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await UsuarioModel.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario o clave invalidos'

            });
        }

        const validarpassword = ValidarPasswordHelper(password, usuario.password);

        if (!validarpassword) {

            return res.status(400).json({
                ok: false,
                msg: 'password invalido'
            });
        }

        const jwt = await GenerarToken(usuario.id, usuario.name);

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            jwt
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ocurrio un error en el servidor'
        });

    }

};


const ActualizarPasswordController = async (req, res = response) => {

    const uid = req.uid;

    try {

        const usuario = await UsuarioModel.findById(uid);

        if (!usuario) {
            return res.status(403).json({
                ok: false,
                msg: 'error al enviar los datos'
            });
        }

        let { password, newPassword } = req.body;

        const validarClaveActual = ValidarPasswordHelper(password, usuario.password);

        if (!validarClaveActual) {
            return res.status(400).json({
                ok: false,
                msg: 'clave actual invalida'
            });
        }

        newPassword = GenerarPasswordHelper(newPassword);



        await UsuarioModel.findByIdAndUpdate(uid, { password: newPassword }, { new: true });

        res.status(201).json({
            ok: true
        });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error del servidor',
        });
    };
};


const RecuperarClavePorCorreoController = async (req, res = response) => {


    const { email } = req.body;

    const usuario = await UsuarioModel.findOne({ email });

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'email invalido, no se encuentra registrado en nuestro sistema'
        })
    }

    try {
        const token = await GenerarToken(usuario.id, usuario.name);
        try {

            await EnviarCorreoRecuperacionClave(email, token);

            res.status(200).json({
                ok: true
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error al enviar el email'
            });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al generar token'
        });
    }


};


module.exports = {
    CrearUsuarioController,
    LoginController,
    ActualizarPasswordController,
    RecuperarClavePorCorreoController
}
