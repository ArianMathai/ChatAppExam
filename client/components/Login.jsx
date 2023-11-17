import GoogleLogin from "./GoogleLogin";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import LoginWithMicrosoft from "./LoginWithMicrosoft";

function Login(){

    const {google_discovery_url, microsoft_endpoint} = useContext(LoginContext)

    return (
        <>
            <div className="login-buttons-container">
                {google_discovery_url && <GoogleLogin />}
                {microsoft_endpoint && <LoginWithMicrosoft />}
            </div>
        </>

    )
}
export default Login;