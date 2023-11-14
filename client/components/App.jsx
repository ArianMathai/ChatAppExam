import AppRoutes from "./AppRoutes";
import {LoginContext} from "../context/LoginContext";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as dotenv from 'dotenv';
import Logout from "./Logout";


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
            <header>
                <h2>Welcome to my exam</h2>
            </header>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/tasks"}>Tasks</Link>
                {!user?.email ? <Link to={"/login"}>Login</Link>
                : <Logout className="logout-link" />}

            </nav>

            <main>
                <AppRoutes/>
            </main>

            <footer>Made by Arian</footer>
        </LoginContext.Provider>
    )
}
export default App;