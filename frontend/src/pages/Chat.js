import React, { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const d = new Date(Date.now());
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: `${d.getHours()} : ${d.getMinutes()}`,
            }
            await socket.emit("send_message", messageData);
            setMessagesList([...messagesList, messageData]);
            setCurrentMessage("");
        }
    }

    // useEffect(() => {

    // }, [socket]);
    socket.on("receive_message", (data) => {
        console.log(messagesList);
        setMessagesList([...messagesList, data]);
    });

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
                <p>Room ID: {room}</p>
                <p>{username}</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messagesList.map((msgObj, index) => {
                        return (
                            <div
                                className={`message ${username === msgObj.author ? "you" : "other"}`}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{msgObj.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p className="time">{msgObj.time}</p>
                                        <p className="author">{msgObj.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Aa"
                    value={currentMessage}
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(e) => {
                        // trigger the function sendMessage() whenever the user clicks Enter:
                        e.key == "Enter" && sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                >
                    &#9658;
                </button>
            </div>
        </div>
    )
}

export default Chat