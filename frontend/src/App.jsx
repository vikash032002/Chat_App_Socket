import React, { useState } from "react";
import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";
import { io } from "socket.io-client";
import SocketContext from "./components/SocketContex";
import { BrowserRouter, Routes, Route } from "react-router";
const socket = io("http://localhost:3000");

const App=()=>{

    const[userData, setUserData] = useState({username:"", roomId: ""})

    return (
      <SocketContext.Provider value={{ socket, userData, setUserData }}>
        <BrowserRouter>
            <Routes>
                <Route path = "/" element= {<JoinRoom/>}/>
                <Route path = '/chat/:roomId' element= {<Chat />} />
            </Routes>
      
        </BrowserRouter>
   
      </SocketContext.Provider>
    );
};

export default App;