import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../context/LoginContext";

function GoogleLogin(){

    const [authorizationUrl, setAuthorizationUrl] = useState("");

    const {client_id} = useContext(LoginContext);
    const DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
    async function loadAuthorizationUrl(){
        const res = await fetch(DISCOVERY_URL);
        const discoveryDoc = await res.json();

        setAuthorizationUrl(discoveryDoc.authorization_endpoint + "?" + new URLSearchParams({
            response_type: "token",
            scope: "email",
            client_id,
            redirect_uri: window.location.origin + "/login/callback",
        }));
    }

    useEffect(() => {
        loadAuthorizationUrl();
    }, []);


    return(
        <a className="google-button" href={authorizationUrl}>Login with google</a>
    )
}

export default GoogleLogin;