import React, {useState, useContext} from "react";
import SocketContext from "./SocketContex";
import { useNavigate } from "react-router";

const JoinRoom = () => {
  const [username, setUsername]= useState("");
  const [roomId, setRoomId] = useState("");
  const {socket, setUserData} = useContext(SocketContext);
  const navigate = useNavigate();

  const handleJoin = (e) =>{
    e.preventDefault();
    if(!username || !roomId) return;
    console.log("teSt", username, roomId);
    setUserData({username, roomId});
    socket.emit("join_room", roomId);
    navigate(`/chat/${roomId}`);
  }
  return (
    <>
      <form onSubmit={handleJoin}>
        <label htmlFor="user">UserName:</label>
        <input id="user" type="text" value={username} onChange={(e)=> setUsername(e.target.value)} />
        <label htmlFor="roomId">RoomId:</label>
        <input id="roomId" type="text" value={roomId} onChange={(e)=> setRoomId(e.target.value)} />
        <button>Join Room</button>
      </form>
    </>
  );
};

export default JoinRoom;
