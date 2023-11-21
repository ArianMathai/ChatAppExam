import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";


function Profile(){

    const {user} = useContext(LoginContext);


    return (
        user ? (
            <div>
                <h2>Profile</h2>
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        ) : (
            <h2>Login to see profile</h2>
        )
    )
}
export default Profile;