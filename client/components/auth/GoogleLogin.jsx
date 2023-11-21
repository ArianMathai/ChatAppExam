import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../context/LoginContext";

function GoogleLogin(){

    const [authorizationUrl, setAuthorizationUrl] = useState("");

    const {google_client_id, google_discovery_url} = useContext(LoginContext);

    async function loadAuthorizationUrl(){
        const res = await fetch(google_discovery_url);
        const discoveryDoc = await res.json();

        setAuthorizationUrl(discoveryDoc.authorization_endpoint + "?" + new URLSearchParams({
            response_type: "token",
            scope: "email profile",
            client_id: google_client_id,
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