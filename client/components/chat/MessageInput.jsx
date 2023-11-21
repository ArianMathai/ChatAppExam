import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../context/LoginContext";

function MessageInput({room}){

    const [message,setMessage] = useState("");

    const {user, username} = useContext(LoginContext);




    async function handleSubmitMessage(e){
        e.preventDefault()
        console.log("Room in messageInput = ", room)

        try {
            const response = await fetch("/api/chat/postmessage", {
                method: "POST",
                body: JSON.stringify({username:username, user: user.email, message, roomName:room.room.roomName}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMessage("");


        } catch (error){
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
            <button style={{
                width: '20%',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
            }} onClick={(e) => handleSubmitMessage(e)}>Post message</button>
        </div>
    )
}
export default MessageInput;
