import AppRoutes from "./AppRoutes";
import {LoginContext} from "../context/LoginContext";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Logout from "./Logout";



function App(){


    const [user, setUser] = useState();
    const [google_client_id, setGoogle_client_id] = useState();
    const [googleDiscoveryUrl, setGoogleDiscoveryUrl] = useState();


    async function loadUser(){
        const res = await fetch("/api/login/user", {

        })
        const usr = await res.json();
        setUser(usr);
    }

    async function fetchDiscoveryUrl(){
        const res = await fetch("/api/login/auth/config", {

        });

        const data = await res.json();

        setGoogle_client_id(data.client_id);
        setGoogleDiscoveryUrl(data.discoveryUrl);
    }

    useEffect(() => {
        fetchDiscoveryUrl();
    }, []);

    useEffect(() => {
        loadUser();
    }, []);




    return(
        <LoginContext.Provider value={{user, loadUser, google_client_id: google_client_id, google_discovery_url: googleDiscoveryUrl}}>
            <header>
                <h2>Welcome to my exam</h2>
            </header>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/tasks"}>Tasks</Link>
                <div style={{flex: 1}}></div>
                {!user?.email ? <Link to={"/login"}>Login</Link>
                : <Logout className="logout-link" />}

            </nav>

            <main>
                <AppRoutes />
            </main>

            <footer>Made by Arian</footer>
        </LoginContext.Provider>
    )
}
export default App;