const express = require('express');
require('dotenv').config();
const { DB } = require('./database/config');
const app = express();

// DB conexion
DB();

app.use(express.json());

//rutas
//ruta publicas
app.use('/api',require('./routes/publicRouter'));

//ruta autentificacion
app.use('/api/auth', require('./routes/authRouter'));








app.listen(process.env.PORT_SERVER,()=>{
	console.log(`servidor corriendo en el puerto ${process.env.PORT_SERVER}`);
});