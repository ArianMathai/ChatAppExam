import App from "./App";
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import LoginCallback from "./LoginCallback";
import Logout from "./Logout";
import MainPage from "./MainPage";

function AppRoutes(){

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login/callback"} element={<LoginCallback />} />
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/main"} element={<MainPage />} />
            <Route path={"*"} element={<h2>NOT FOUND</h2>} />
        </Routes>
    )

}
export default AppRoutes;