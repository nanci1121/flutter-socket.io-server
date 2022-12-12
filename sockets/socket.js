const { io } = require('../index')
const Bands = require('../models/bands');
const Band =require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Heros del Silencio'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('People'));

console.log(bands);


//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { console.log('Cliente desconectado') });

    client.on('mensaje', (payload) => {

        console.log('Mensaje:', payload);

        io.emit('mensaje', { admin: 'Nuevo Mensaje' });       
        
    });

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    // Escuchar add-band 
    client.on('add-band',(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());

    });


    //delete-band
    client.on('delete-band',(payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });




  /*   client.on('emitir-mensaje', (payload) => {
        // console.log('Mensaje:', payload);
        // io.emit('nuevo-mensaje',  payload );  //emite a todos   
        client.broadcast.emit('nuevo-mensaje',  payload );  //emite a todos menos al que lo emitio   
        
    }) */
});