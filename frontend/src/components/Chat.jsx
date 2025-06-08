import React, { useEffect, useState, useContext } from 'react';
import SocketContext from './SocketContex';

const Chat=()=> {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [myId, setMyId] = useState("");
  const {socket, userData} = useContext(SocketContext);
  useEffect(() => {

    socket.on("msg_rcv", (data) => {
      console.log("message_rcv",data)
      setChat(prev => [...prev, data]);
      setMyId(socket.id);
    });
    
    return () => {
      socket.off("msg_rcv");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("msg_send", {
        text: message,
        sender: socket.id,
        roomId: userData.roomId,
        username: userData.username
      });
      // setChat((prev) => [
      //   ...prev,
      //   { text: message, sender: socket.id, username: userData.username },
      // ]);
      setMessage("");
    }
  };

  console.log(message)

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Chat Room: {userData.roomId}</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "scroll", marginBottom: "10px" }}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === myId ? "right" : "left",
              margin: "5px 0"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                backgroundColor: msg.sender === myId ? "#DCF8C6" : "#E5E5EA",
                color: "#000",
                maxWidth: "70%",
              }}
            >
              {msg.username}~~{msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
