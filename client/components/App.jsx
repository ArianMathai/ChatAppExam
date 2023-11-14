import AppRoutes from "./AppRoutes";
import {LoginContext} from "../context/LoginContext";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as dotenv from 'dotenv';


function App(){


    const [user, setUser] = useState();


    async function loadUser(){
        const res = await fetch("/api/login/user", {

        })
        const usr = await res.json();
        setUser(usr);
    }

    useEffect(() => {
        loadUser();
    }, []);



    const client_id = process.env.CLIENT_ID;


    return(
        <LoginContext.Provider value={{user, loadUser, client_id: client_id}}>
            <header>Welcome to the google login page</header>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/main"}>Main page</Link>
                <Link to={"/logout"}>Logout</Link>

            </nav>

            <main><AppRoutes/></main>

            <footer>Made by Arian</footer>
        </LoginContext.Provider>
    )
}
export default App;