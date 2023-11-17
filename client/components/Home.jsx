import GoogleLogin from "./GoogleLogin";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import Login from "./Login";

function Home(){

    const {user} = useContext(LoginContext);

    return(
        user?.email ?
        <>
            <h2>HOME SWEET HOME</h2>

        </>
            :
            <div></div>
    )
}
export default Home;