const { ingresarUsuarios,  getUsuario, deleteUsuario  } = require("./funtions"); 
const { io } = require('../server');
io.on('connection', (client) => {

    client.on("joinRoom", ({ username, roomname }) => {
        const usuario = ingresarUsuarios(client.id, username, roomname);
        console.log(client.id, "=id");
        client.join(usuario.room);
    
        client.emit("message", {
          userId: usuario.id,
          username: usuario.username,
          text: `Bienvenido ${usuario.username}`,
        });
    
        client.broadcast.to(usuario.room).emit("message", {
          userId: usuario.id,
          username: usuario.username,
          text: `${usuario.username} ha entrado al chat`,
        });
    });

    client.on("chat", (mensaje) => {
        //gets the room user and the message sent
        const usuario = getUsuario(client.id);
    
        io.to(usuario.room).emit("message", {
          userId: usuario.id,
          username: usuario.username,
          text: mensaje,
        });
    });

    console.log('Usuario Conectado');

    client.emit('mensajeServidor', {
        usuario: 'Admin',
        mensaje: 'Bienvenidos a la aplicación'
    });

    client.on('Disconnect', () => {
        console.log('Usuario desconectado');
        const usuario = deleteUsuario (client.id);

        if (usuario) {
            io.to(usuario.room).emit("message", {
                userId: usuario.id,
                username: usuario.username,
                text: `${usuario.username} ha dejado el chat`,
            });
        }
    });

    client.on('mensajeCliente', (mensaje, callback) => {
        console.log(mensaje);

        client.broadcast.emit('mensajeServidor',mensaje);
        if (mensaje.usuario) {
            callback({
                resp: 'Todo salió bien'
            });
        } else {
            callback({
                resp: 'Todo Salió mal'
            });
        }

    });
});