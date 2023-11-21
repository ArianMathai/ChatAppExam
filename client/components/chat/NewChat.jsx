import {useState, useEffect, useContext, useMemo} from "react";
import {LoginContext} from "../../context/LoginContext";
import {useNavigate} from "react-router-dom";

function NewChat() {
    const [roomName, setRoomName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([])
    const [rooms, setRooms] = useState([])

    const [roomExists, setRoomExists] = useState(true);

    const {email} = useContext(LoginContext);
    const navigate = useNavigate();

/*
    async function checkForDuplicateRoomName(){
        const res = await fetch("/api/chat/getRoom", {
            method: "POST",
            body: JSON.stringify({roomName}),
            headers: {
                "content-type": "application/json",
            },
        })

        const data = await res.json()
        console.log("roomData when checking if exists = ", data)

        if (data.roomExists === true){

            setRoomExists(true);
        }
        else{
            setRoomExists(false);
        }
    }

    const isValidRoomName = useMemo(() => {
        if (roomName.length > 0 && roomExists){
            return true;
        }
        else{
            return false;
        }
    }, [roomExists])

 */

    async function getAllRooms(){
        const res = await fetch("/api/chat/getAllRooms");
        if (res.ok){
            const data = await res.json();
            console.log("RoomsData = ", data)
            setRooms(data)
        }
        else{
            console.log("Could not get rooms");
        }
    }

    async function handleAddNewChat(e){
        e.preventDefault();

        const resp = await fetch("/api/chat/room", {
            method:"POST",
            body: JSON.stringify({email, roomName, participants, messages}),
            headers: {
                "content-type": "application/json",
            },
        })

        navigate("/chatroom");
    }

    async function fetchUserEmails(){

        const res = await fetch("/api/login/getAllUsers");
        const data = await res.json();
        setUsers(data) /// set emails here

    }
/*
    useEffect(() => {
        checkForDuplicateRoomName();
    }, [roomName]);

 */

    useEffect(() => {
        fetchUserEmails();
        getAllRooms();
    }, []);

    console.log("user array in newChat = ", users)
    function handleAddParticipant (selectedEmail) {
        if (!participants.includes(selectedEmail)) {
            setParticipants([...participants, selectedEmail]);
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleAddNewChat(e)}>
                <label>
                    Room name:
                    <div>
                        <input
                            className="input"
                            type="text"
                            name="roomName"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </div>
                </label>
                <label>
                    Add participants to chat:
                    <div>
                        <select
                            className="input"
                            name="participants"
                            onChange={(e) => handleAddParticipant(e.target.value)}
                        >
                            <option value="">Select participant</option>
                            {users.map((user) => (
                                <option key={user.email} value={user.email}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <ul>
                            {participants.map((participant) => (
                                <li key={participant}>{participant}</li>
                            ))}
                        </ul>
                    </div>
                </label>
                <button
                    type="submit"
                    //disabled={isValidRoomName}
                >Create new chatroom</button>
            </form>
        </>
    );
}

export default NewChat;
