import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewChat from "./NewChat";
import { LoginContext } from "../../context/LoginContext";

function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const { username, email } = useContext(LoginContext);

  async function fetchRooms() {
    const res = await fetch("/api/chat/getAllRooms");

    if (res.ok) {
      const data = await res.json();
      const filteredRooms = data.filter((r) => r.participants.includes(email));
      setRooms(filteredRooms);
    } else {
      console.log("Failed to fetch rooms");
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  return username ? (
    <>
      <h1 className={"chatroom-header"}>Chatrooms</h1>
      <ul className={"list-room-ul"}>
        {rooms.map((r, index) => (
          <li className={"li-room-list"} key={index}>
            <Link to={`/chatroom/${r.roomName}`}>
              <div
                className={"roomname-container"}
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                {r.roomName}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <Link to={"/chat/new"}>
          <button>New chat</button>
        </Link>
      </div>
    </>
  ) : (
    <h2>Login to browse chatrooms</h2>
  );
}
export default ListRooms;
