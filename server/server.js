import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import {loginRoutes} from "./controller/loginRoutes.js";
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv';
import {taskRoutes} from "./controller/taskRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use("/api/login", loginRoutes);
app.use("/api/tasks", taskRoutes);

app.use(express.static("../client/dist"))




app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});


app.listen(process.env.PORT || 3000);