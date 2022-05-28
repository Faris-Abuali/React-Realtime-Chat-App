import './App.css';
import io from "socket.io-client";
import { useState, useEffect } from 'react';
// ---- My Components: ---------------
import Chat from "./pages/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Username.."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID.."
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            onClick={joinRoom}
          >
            Join a Room
          </button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={roomId}
        />
      )}
    </div >
  );
}

export default App;
