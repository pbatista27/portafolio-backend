const { check } = require('express-validator');


const ReglaValidarCrearUsuario = () => {

    return [
        check(['name', 'email', 'password']).not().isEmpty().withMessage('campo requerido'),
        check('name').isLength({ min: 3 }).withMessage('debe contener minimo 3 caracateres'),
        check('email').isEmail().withMessage('formato no valido'),
        check('password').isLength({ min: 6 }).withMessage('debe contener al minimo 6 caracteres')
    ];

};


const ReglaValidarLogin = () => {

    return [
        check(['email', 'password']).not().isEmpty().withMessage('este campo es requerido'),
        check('email').isEmail().withMessage('formato invalido')
    ];
    
};


const ReglaValidarActualizarClave = () => {

    return [
        check(['password', 'newPassword']).not().isEmpty().withMessage('el campo es requerido'),
        check('newPassword').isLength({ min: 6 }).withMessage('debe contener minimo 6 caracteres')
    ];


};

const ReglaValidarResetPassword = () => {

    return [
        check('email').not().isEmpty().withMessage('el campo es requerido')
            .isEmail().withMessage('formato no valido')
    ];
}



module.exports = {
    ReglaValidarCrearUsuario,
    ReglaValidarLogin,
    ReglaValidarActualizarClave,
    ReglaValidarResetPassword
}
