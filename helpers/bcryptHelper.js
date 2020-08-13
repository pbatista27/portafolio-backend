const bcrypt = require('bcryptjs');


const GenerarPasswordHelper = (password) => {

    const salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);

}


const ValidarPasswordHelper = (password, usuarioPassword) => {
    return bcrypt.compareSync(password, usuarioPassword);
}


module.exports = {
    GenerarPasswordHelper,
    ValidarPasswordHelper
};