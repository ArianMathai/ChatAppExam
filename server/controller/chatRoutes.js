import express from "express";
import * as dotenv from 'dotenv';
import {addRoomToDb, getRoomBasedOnRoomName} from "../repository/chatRepo.js";


dotenv.config();


export const chatRoutes = express.Router();

chatRoutes.post("/room", async (req, res) => {

    const {email, roomName, participants} = req.body;

    const response = await addRoomToDb(email, roomName, participants);

    if (!response.acknowledged){
        res.status(400).json({message: "failed to add room to db"})
    }
    else{
        res.status(200).json({message: "added room to db"})
    }

})
chatRoutes.post("/getRoom", async (req, res) => {
    const {roomName} = req.body;

    const response = await getRoomBasedOnRoomName(roomName);
    console.log("Response on roomName = ", response)

    if (!response.acknowledged){
        res.status(400).json({message: "no room with this name", roomExists: false})
    }
    else{
        res.status(200).json({room:response, message: "room exists", roomExists: true})
    }


})