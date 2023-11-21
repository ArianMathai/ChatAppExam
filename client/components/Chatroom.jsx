import {Link} from "react-router-dom";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";

function Chatroom(){

    const {user} = useContext(LoginContext);



    return (
        <>
            {user.email ? (
                <div className={"message-board"}>
                    <h2>Chat</h2>
                    <div>
                        <Link to={"/chat/new"}>
                            <button>New chat</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <h2>Login to see chatroom</h2>
            )}
        </>
    );

}
export default Chatroom;