import Chat from "./chat/chat";
import Home from "./home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import io from "socket.io-client";

const socket = io.connect('/');
const Appmain =(props) =>{
  //alert("Se unió "+props.match.params.username);
  return (
    <React.Fragment>
      <div>
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      
    </React.Fragment>
  );
}
const App = ()=> {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route path="/chat/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;