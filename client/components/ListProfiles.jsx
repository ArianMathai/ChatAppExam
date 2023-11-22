import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../context/LoginContext";

function ListProfiles(){

    const [users, setUsers] = useState([]);

    const {username} = useContext(LoginContext);
    async function getUsers(){
        const res = await fetch("/api/login/getAllUsers");

        if (res.ok){
            const data = await res.json();
            console.log("user data in listprofiles = ",data)
            setUsers(data)
        }

    }

    useEffect(() => {
        getUsers()
    }, []);


    return(
        username ?
        <>
            <div>
                {users.map((user, index) => (
                    <div className="message-container" key={index}>
                        <p className="message-line">{user.username}</p>
                        <p className="message-line">{user.email}</p>
                        <p className="message-line">{user.bio}</p>
                    </div>
                ))}
            </div>

        </> : <h2>Login to browse profiles</h2>


    )
}
export default ListProfiles;