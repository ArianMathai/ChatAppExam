import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { chatRoutes } from "../controller/chatRoutes.js";

dotenv.config();

const app = express();
app.use(chatRoutes);
app.use(bodyParser.json());
app.use("/api/chat", chatRoutes);

describe("backend testing of chat routes", () => {
  it("should post a message to the database", async () => {
    const sampleMessage = {
      username: "test",
      user: "test@test.com",
      message: "Hello, testing!",
      roomName: "testRoom",
    };

    const response = await request(app)
      .post("/api/chat/postmessage")
      .send(sampleMessage);

    expect(response.status).toBe(200);

    expect(response.body.message).toBe("posted message to db");
  });

  it("responds with JSON containing a list of rooms", async () => {
    const response = await request(app).get("/api/chat/getAllRooms");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("length");
  });
});
