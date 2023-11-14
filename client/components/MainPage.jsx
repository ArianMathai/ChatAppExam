import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import GoogleLogin from "./GoogleLogin";

function MainPage(){

    const {user} = useContext(LoginContext);




    return(

        user?.email ?
        <>
            <h3>MAIN</h3>
        </>
            :
            <>
            <h1> Not authorized</h1>
                <GoogleLogin/>
            </>
    )
}
export default MainPage;