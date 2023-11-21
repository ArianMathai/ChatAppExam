import AppRoutes from "./AppRoutes";
import {LoginContext} from "../context/LoginContext";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Logout from "./Logout";



function App(){


    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [google_client_id, setGoogle_client_id] = useState();
    const [googleDiscoveryUrl, setGoogleDiscoveryUrl] = useState();
    const [microsoftEndpoint, setMicrosoftEndpoint] = useState();
    const [microsoftClientId, setMicrosoftClientId] = useState();

    async function loadUser() {
        const res = await fetch("/api/login/user");
        const usr = await res.json();
        console.log("google usr obj = ", usr)
        setUser(usr);
        setUsername(usr.name);
        setEmail(usr.email)
        console.log("googleuser=", usr.name);

        if (!user) {
            const response = await fetch("/api/login/microsoft/user");
            const micUser = await response.json();
            console.log("name = " ,micUser.name)
            setUser(micUser);
            setUsername(micUser.name);
            setEmail(micUser.email)
            console.log("micuser" , micUser.email);
        }
    }


    async function fetchLoginConfig(){
        const res = await fetch("/api/login/auth/config", {

        });

        const data = await res.json();
        console.log("this is the stuff = ", data)

        setGoogle_client_id(data.client_id);
        setGoogleDiscoveryUrl(data.discoveryUrl);
        setMicrosoftClientId(data.microsoft_client_id);
        setMicrosoftEndpoint(data.microsoft_endpoint);
    }

    useEffect(() => {
        fetchLoginConfig();
    }, []);

    useEffect(() => {
        if (username === undefined) {
            loadUser();
        }
    }, [username]);



    return(
        <LoginContext.Provider value={{
            user,
            username: username,
            email: email,
            loadUser,
            google_client_id: google_client_id,
            google_discovery_url: googleDiscoveryUrl,
            microsoft_endpoint: microsoftEndpoint,
            microsoft_client_id: microsoftClientId
        }}>
            <header>
                {username ?<h2>{username}</h2> : <h2>  </h2>}
            </header>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/tasks"}>Tasks</Link>
                <Link to={"/profile"}>Profile</Link>
                <div style={{flex: 1}}></div>

                {!username ? <Link to={"/login"}>Login</Link>
                : <Logout className="logout-link" />}

            </nav>

            <main>
                {microsoftEndpoint !== undefined && <AppRoutes />}
            </main>

            <footer>Made by Arian</footer>
        </LoginContext.Provider>
    )
}
export default App;