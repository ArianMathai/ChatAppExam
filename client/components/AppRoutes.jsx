
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import LoginCallback from "./LoginCallback";


import Login from "./Login";
import Tasks from "./Tasks";
import Profile from "./Profile";

function AppRoutes(){

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/tasks"} element={<Tasks />} />
            <Route path={"*"} element={<h2>NOT FOUND</h2>} />
        </Routes>
    )

}
export default AppRoutes;