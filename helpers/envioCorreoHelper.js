const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
});




const EnviarCorreoRecuperacionClave = async(email,token) => {
 
    
    const asunto='Recuperacion de Clave';
    const body=`<b>Para Recupera la clave en nuestro sistema, has click </b> <a href=http://localhost:4000/api/auth/update-password/${token}>aqui</a>`;

    await EnvioDeCorreo(email,asunto, body);


};

const EnvioDeCorreo = async(email,asunto, body) => {

    try {
        // send mail with defined transport object
       const info = await transporter.sendMail({
       from: process.env.EMAIL_USER, // sender address
       to: email, // list of receivers
       subject: asunto,
       text:'prueba',
       html: body // html body
     });
    
     console.log("Message sent: %s", info.messageId);
     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
     // Preview only available when sending through an Ethereal account
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
    } catch (error) {
            console.log(error);
    }    
};

module.exports = {
    EnviarCorreoRecuperacionClave,
};