const { Router } = require('express');
const JwtMiddleware = require('../middlewares/jwtMiddleware');
const {
    ReglaValidarLogin,
    ReglaValidarCrearUsuario,
    ReglaValidarResetPassword,
    ReglaValidarActualizarClave
} = require('../helpers/reglaValidacionHelper');
const CapturaError = require('../middlewares/errorCampoMiddleware');
const {
    CrearUsuarioController,
    LoginController,
    ActualizarPasswordController,
    RecuperarClavePorCorreoController
} = require('../controllers/authController');



const router = Router();

router.post('/', [ReglaValidarCrearUsuario(), CapturaError], CrearUsuarioController);
router.post('/login', [ReglaValidarLogin(), CapturaError], LoginController);
router.post('/update-password', [ReglaValidarActualizarClave(), CapturaError, JwtMiddleware], ActualizarPasswordController);
router.post('/reset-password', [ReglaValidarResetPassword(), CapturaError], RecuperarClavePorCorreoController);
router.get('/update-password/:token', function (req, res) {
    const { token } = req.params
    res.json({
        ok: true,
        toke: token
    });
});
module.exports = router;