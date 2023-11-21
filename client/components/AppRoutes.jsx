
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import LoginCallback from "./LoginCallback";


import Login from "./Login";
import Tasks from "./Tasks";
import Profile from "./Profile";
import Chatroom from "./Chatroom";
import NewChat from "./NewChat";

function AppRoutes(){

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/chatroom"} element={<Chatroom />} />
            <Route path={"/chat/new"} element={<NewChat />} />
            <Route path={"*"} element={<h2>NOT FOUND</h2>} />
        </Routes>
    )

}
export default AppRoutes;