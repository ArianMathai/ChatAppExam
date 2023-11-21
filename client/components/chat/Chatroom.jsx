import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../context/LoginContext";
import MessageInput from "./MessageInput";

function Chatroom(){

    const {user} = useContext(LoginContext);

    const [room, setRoom] = useState();

    const { roomName } = useParams();
    console.log("Roomname in chatroom = ", roomName, room)

    async function fetchRoom(){
        const res = await fetch(`/api/chat/getRoom/${roomName}`, )
        const data = await res.json();
        console.log("Data = room = ", data)

        if (res.ok && data) {
            console.log("setting room")
            console.log(data)
            setRoom(data);
        } else {
            console.log("Did not find room");
        }

    }

    useEffect(() => {
        fetchRoom()
    }, []);

    async function fetchMessages(){

        const res = await fetch("/api/chat/getAllMessages", {

        })

    }



    return (
        <>
            {user.email ? (
                <div className={"message-board"}>
                    {room ? (
                        <>
                            <h2>Chatroom: {room.room.roomName}</h2>
                            <div>
                                {room.room.messages.map((message, index) => (
                                    <div key={index}>
                                        <p>{message}</p>

                                    </div>
                                ))}
                            </div>
                            <MessageInput room={room} />
                            <div>
                                <Link to={"/chat/new"}>
                                    <button>New chat</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p>Loading room...</p>
                    )}

                </div>
            ) : (
                <h2>Login to see chatroom</h2>
            )}
        </>
    );


}
export default Chatroom;