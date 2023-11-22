import { useState, useEffect, useContext, useMemo } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

function NewChat() {
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const { email } = useContext(LoginContext);
  const navigate = useNavigate();

  async function getAllRooms() {
    const res = await fetch("/api/chat/getAllRooms");
    if (res.ok) {
      const data = await res.json();
      setRooms(data);
    } else {
      console.log("Could not get rooms");
    }
  }
  const isValidRoom = useMemo(() => {
    return (
      roomName.length > 0 && rooms.every((room) => room.roomName !== roomName)
    );
  }, [roomName, rooms]);

  async function handleAddNewChat(e) {
    e.preventDefault();

    const updatedParticipants = [...participants, email];
    const resp = await fetch("/api/chat/room", {
      method: "POST",
      body: JSON.stringify({
        email,
        roomName,
        participants: updatedParticipants,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    navigate("/chatroom");
  }

  async function fetchUserEmails() {
    const res = await fetch("/api/login/getAllUsers");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    fetchUserEmails();
    getAllRooms();
  }, []);
  function handleAddParticipant(selectedEmail) {
    if (!participants.includes(selectedEmail)) {
      setParticipants([...participants, selectedEmail]);
    }
  }

  return (
    <>
      <form className="chat-form" onSubmit={(e) => handleAddNewChat(e)}>
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
          <div className="participants-list">
            <ul>
              {participants.map((participant) => (
                <li key={participant}>{participant}</li>
              ))}
            </ul>
          </div>
        </label>
        <button type="submit" className="submit-button" disabled={!isValidRoom}>
          Create new chatroom
        </button>
      </form>
    </>
  );
}

export default NewChat;
