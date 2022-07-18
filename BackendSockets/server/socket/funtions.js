const usuarios = [];

const ingresarUsuarios = (id, username, room) => {
    const usuario = { id, username, room };

    usuarios.push(usuario);
    console.log(usuarios, "usuarios");

    return usuario;
}

const getUsuario = (id) => {
    return usuarios.find((usuario)=>usuario.id == id);
}

const deleteUsuario = (id) => {
    const index = usuarios.findIndex((usuario) => usuario.id == id);

    if (index !== -1) {
        return usuarios.splice(index, 1)[0];
    }
}

module.exports = { ingresarUsuarios,  getUsuario, deleteUsuario  };