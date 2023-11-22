import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { WebSocketContext } from "../webSocket/WebSocketProvider";

function MessageInput({ room }) {
  const [message, setMessage] = useState("");

  const { user, username, email } = useContext(LoginContext);
  const webSocket = useContext(WebSocketContext);

  async function handleSubmitMessage(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/chat/postmessage", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          user: user.email,
          message,
          roomName: room.room.roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setMessage("");

        if (webSocket) {
          const messageObject = {
            username: username,
            user: email,
            message: message,
            roomName: room.room.roomName,
          };
          webSocket.send(JSON.stringify(messageObject));
        }
      } else {
        console.error("Failed to post message");
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div id="massage-input-container">
      <label>Enter Text:</label>
      <textarea
        id="text"
        name="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
      ></textarea>
      <button
        style={{
          width: "20%",
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
        onClick={(e) => handleSubmitMessage(e)}
      >
        Post message
      </button>
    </div>
  );
}
export default MessageInput;
