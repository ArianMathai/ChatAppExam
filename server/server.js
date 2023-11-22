import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import { loginRoutes } from "./controller/loginRoutes.js";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";
import * as dotenv from "dotenv";
import { chatRoutes } from "./controller/chatRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/login", loginRoutes);
app.use("/api/chat", chatRoutes);

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const wsServer = new WebSocketServer({ noServer: true });

const server = app.listen(process.env.PORT || 3000);

const sockets = [];

server.on("upgrade", (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (socket) => {
    sockets.push(socket);
    socket.on("message", (object) => {
      const message = JSON.parse(object);

      for (const s of sockets) {
        s.send(JSON.stringify({ message }));
      }
    });
  });
});
