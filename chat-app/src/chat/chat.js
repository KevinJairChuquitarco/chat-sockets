import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./chat.css";

const Chat = ({ username, socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt here
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return (
    <div id="log" class="sl__chat__layout">
      <div class="messageBody">
        <div class="messageBox">
          <span class="meta">
            <span class="badges">
            </span>
              <h2 className="name">
                Chat de {username}
              </h2>
            <i class="metaBG"></i>
          </span>
        </div>
        
      </div>
      <div>
        {messages.map((i) => {
          if (i.username === username) {
            return (
              /*<div className="message">
                <div className="message-derecha">
                  <p className="m1">{i.text}</p>
                </div>
              </div>*/
              <div class="messageBody">
                <div class="messageBox">
                  <span class="meta">
                    <span class="badges">
                    </span>
                    <span class="name">{username}</span>
                    <i class="metaBG"></i>
                  </span>
                  <div className="message">
                    <div className="message-derecha">
                    <p className="m1">{i.text}</p>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
              
            );
          } else {
            return (
              <div class="messageBody">
              <div class="messageBox">
                <span class="meta">
                  <span class="badges">
                  </span>
                  <span class="name">{i.username}</span>
                  <i class="metaBG"></i>
                </span>
                <div className="message2">
                  <div className="mensaje-izquierda">
                    <p className="m2">{i.text} </p>
                  </div>
                </div>
                
                
              </div>
            </div>
              
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div >
        <input className="ingreso"
          placeholder="Mensaje"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button className="boton" onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
