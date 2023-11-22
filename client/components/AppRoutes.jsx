
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import LoginCallback from "./auth/LoginCallback";


import Login from "./auth/Login";

import Profile from "./Profile";
import Chatroom from "./chat/Chatroom";
import NewChat from "./chat/NewChat";
import ListRooms from "./chat/ListRooms";
import ListProfiles from "./ListProfiles";

function AppRoutes(){

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/profile/browse"} element={<ListProfiles />} />
            <Route path={"/chatroom"} element={<ListRooms/>} />
            <Route path={"/chatroom/:roomName"} element={<Chatroom />} />
            <Route path={"/chat/new"} element={<NewChat />} />
            <Route path={"*"} element={<h2>NOT FOUND</h2>} />
        </Routes>
    )

}
export default AppRoutes;