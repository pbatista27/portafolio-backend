const jwt = require('jsonwebtoken');


const GenerarToken = (uid, name) => {


    return new Promise( (resolve, reject) => {

        const payload = {uid, name};

        jwt.sign(payload, process.env.SECRET_JWT_SEED,
            { expiresIn:'4h'},
            (error, token) =>{

                if(error){
                    console.log(error);
                    reject('error al generar token');
                }
                resolve(token);
            });

    });

};

module.exports = GenerarToken;