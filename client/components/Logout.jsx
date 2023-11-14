import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";

function Logout(){

    const navigate = useNavigate();
    const {loadUser} = useContext(LoginContext);

    async function handleLogout(e){
        e.preventDefault();


        const response = await fetch("/api/login/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        loadUser();
        navigate("/");

    }

    return (

            <Link to={"/"} onClick={(e) => handleLogout(e)}>Logout</Link>

    )
}

export default Logout;