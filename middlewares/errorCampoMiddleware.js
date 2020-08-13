const { validationResult } = require('express-validator');

const CapturaError = (req, res, next) => {

    const validar = validationResult(req);

    if (!validar.isEmpty()) {

        return res.status(400).json({
            ok: false,
            errors: validar.mapped()
        });

    }

    return next();
};

module.exports = CapturaError;