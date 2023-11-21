import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NewChat from "./NewChat";

function ListRooms(){

    const [rooms, setRooms] = useState([]);

    async function fetchRooms(){

        const res = await fetch("/api/chat/getAllRooms");

        if (res.ok){
            const data = await res.json();
            console.log("Rooms data = ", data)
            setRooms(data)
        }
        else{
            console.log("Failed to fetch rooms")
        }

    }

    useEffect(() => {
        fetchRooms();
    }, []);



    return (
        <>
            <ul>
                {rooms.map((r, index) => (
                    <li key={index}>
                        <Link to={`/chatroom/${r.roomName}`}>
                            <div>{r.roomName}</div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <Link to={"/chat/new"}>
                    <button>New chat</button>
                </Link>
            </div>
        </>
    );


}
export default ListRooms;