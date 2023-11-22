import React, { createContext, useEffect, useState } from "react";


export const WebSocketContext = createContext();

function WebSocketProvider({ children }) {

  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    const ws = new WebSocket(`${protocol}://${window.location.host}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
    };
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed", event);

    };

    setWebSocket(ws);
  }, []);


  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketProvider;
