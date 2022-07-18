let socket = io();
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

//Escuchar
socket.on('disconnect', () => {
    console.log('Se perdió la conexión');
});
 
//Emitir
socket.emit('mensajeCliente', {
    usuario:"Espe",
    mensaje: "Hola",
}, (resp) => {
    console.log('Respuesta servidor: ', resp);
});

//Escuchar
socket.on('mensajeServidor', (mensaje) => {
    console.log(mensaje);
});