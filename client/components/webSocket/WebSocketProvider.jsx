import React, { createContext, useEffect, useContext, useState } from "react";
import {LoginContext} from "../../context/LoginContext";

export const WebSocketContext = createContext();

function WebSocketProvider({ children }) {
    const { email } = useContext(LoginContext);
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        const protocol = window.location.protocol === "http:" ? "ws" : "wss";
        const ws = new WebSocket(`${protocol}://${window.location.host}`);
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received message from server:", data);
        };

        setWebSocket(ws);

        return () => {
            ws.close();
        };
    }, [email]);

    return (
        <WebSocketContext.Provider value={webSocket}>
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketProvider;
