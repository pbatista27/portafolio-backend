const mongoose = require('mongoose');

const DB = async() => {

    try {
        
        await mongoose.connect('mongodb://localhost:27017/portafolio',
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('db online');

    } catch (error) {
        console.log(error);
    }

};

module.exports = {DB};