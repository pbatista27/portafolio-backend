const {response} = require('express');
const jwt = require('jsonwebtoken');



const JwtMiddleware = async(req, res= response, next) => {

    const token = req.header('x-token');


    if(!token){
        return res.status(400).json({
            ok: false,
            msg: 'no has enviado el token'
        });
    }

    try {
        const {uid, name} = await jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;

        next();
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });    
    }

};

module.exports = JwtMiddleware;