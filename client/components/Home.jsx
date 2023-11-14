import GoogleLogin from "./GoogleLogin";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";

function Home(){

    const {user} = useContext(LoginContext);

    return(
        <>
            <GoogleLogin/>
        <div>{user?.email}</div>
        </>
    )
}
export default Home;