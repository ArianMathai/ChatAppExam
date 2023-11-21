import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config();


const uri = process.env.MONGODB;
export async function addRoomToDb(email, roomName, participants){

    const client = await MongoClient.connect(uri);
    const db = await client.db("Exam");
    const collection = db.collection("room");
    return await collection.insertOne({owner:email, roomName:roomName, participants:participants});
}

export async function getRoomBasedOnRoomName(roomName){

    const client = await MongoClient.connect(uri);
    const db = await client.db("Exam");
    const collection = db.collection("room");
    return await collection.findOne({roomName});
}