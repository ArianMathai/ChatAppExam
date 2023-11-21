import express from "express";
import * as dotenv from 'dotenv';
import {addMessageToDb, addRoomToDb, getAllRooms, getRoomBasedOnRoomName} from "../repository/chatRepo.js";
import {getAllUsers} from "../repository/userRepo.js";


dotenv.config();


export const chatRoutes = express.Router();

chatRoutes.post("/room", async (req, res) => {

    const {email, roomName, participants, messages} = req.body;

    const response = await addRoomToDb(email, roomName, participants, messages);

    if (!response.acknowledged){
        res.status(400).json({message: "failed to add room to db"})
    }
    else{
        res.status(200).json({message: "added room to db"})
    }

})
chatRoutes.get("/getAllRooms", async (req, res) => {
    try {
        const rooms = await getAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error, failed to fetch rooms" });
    }
})
chatRoutes.post("/postmessage", async (req, res) => {
    const {user, message, roomName} = req.body;

    const response = await addMessageToDb(user, message, roomName);
    if (!response.acknowledged){
        res.status(400).json({message: "failed to post message to db"})
    }
    else{
        res.status(200).json({message: "posted message to db"})
    }
})

chatRoutes.get("/getAllMessages", async (req, res) => {

})

chatRoutes.get("/getRoom/:roomName", async (req, res) => {
    const roomName = req.params.roomName;
    console.log("Roomname in controller = ", roomName)

    const response = await getRoomBasedOnRoomName(roomName);

    console.log("response in controller = ", response)

    if (!response){
        res.status(400).json({message: "no room with this name", roomExists: false})
    }
    else{
        res.status(200).json({room:response, message: "room exists", roomExists: true})
    }


})