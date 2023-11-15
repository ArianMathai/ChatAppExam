import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../context/LoginContext";

function LoginWithMicrosoft(){
    const [authorizationUrl, setAuthorizationUrl] = useState("");

    const {microsoft_client_id, microsoft_endpoint} = useContext(LoginContext);

    async function loadAuthorizationUrl() {


        console.log(microsoft_client_id);
        console.log(microsoft_endpoint);

        //const {authorization_endpoint} = await fetch(config_url);

        const code_verifier = randomString(50);

        window.sessionStorage.setItem("code_verifier", code_verifier);

        const code_challenge = await sha256(code_verifier);

        //State, typ 38 min ut i filmen
        const state = randomString(50);

        window.sessionStorage.setItem("state", state);

        const res = await fetch(microsoft_endpoint);
        const discoveryDocument = await res.json();
        const params = {
            response_mode: "fragment",
            response_type: "code",
            scope: "openid profile",
            client_id: microsoft_client_id,
            redirect_uri: window.location.origin + "/login/callback",
            code_challenge: code_challenge,
            code_challenge_method: "S256",
            domain_hint: "egms.no",
        };
        setAuthorizationUrl(
            discoveryDocument.authorization_endpoint +
            "?" +
            new URLSearchParams(params),
        );
    }

    useEffect(() => {
        loadAuthorizationUrl();
    }, []);

    return (
        <a className={"google-button"} href={authorizationUrl}>Login With Microsoft</a>
    )
}

async function sha256(string) {
    const binaryHash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder("utf-8").encode(string),
    );
    return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
        .split("=")[0]
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function randomString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export default LoginWithMicrosoft;
