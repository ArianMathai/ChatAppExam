import GoogleLogin from "./GoogleLogin";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import LoginWithMicrosoft from "./LoginWithMicrosoft";

function Login(){

    const {google_discovery_url, microsoft_endpoint} = useContext(LoginContext)

    return (
        <>
            {google_discovery_url && <GoogleLogin />}
            {microsoft_endpoint && <LoginWithMicrosoft />}
        </>

    )
}
export default Login;