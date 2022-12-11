const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
require('dotenv').config();

//App de Express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');






const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


/* app.use('/',(req,res)=>{
res.status(200).send('La API funciona correctamente');
}); */

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto `, process.env.PORT);
});
