import GoogleLogin from "./GoogleLogin";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import ActiveDirLoginButton from "./LoginWithMicrosoft";

function Login(){

    const {google_discovery_url} = useContext(LoginContext)

    return (
        <>
            {google_discovery_url && <GoogleLogin />}
            <ActiveDirLoginButton />
        </>

    )
}
export default Login;