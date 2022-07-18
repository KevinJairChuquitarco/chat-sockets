import React, { useState } from "react";
import { Link } from "react-router-dom";

const Homepage = ({ socket })=> {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("chat");

  const sendData = () => {
    if (username !== "") {
      socket.emit("joinRoom", { username, roomname });
    } else {
      alert("Por favor, ingrese su nombre");
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>Aplicación de chat</h1>
      <input
        placeholder="Ingrese su nombre"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendData();
          }}}
      />
      <Link to={`/chat/${username}`}>
        <button onClick={sendData}>Entrar</button>
      </Link>
    </div>
  );
}

export default Homepage;
