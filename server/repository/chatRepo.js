import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB;
export async function addRoomToDb(email, roomName, participants, messages) {
  const client = await MongoClient.connect(uri);
  const db = await client.db("Exam");
  const collection = db.collection("room");
  return await collection.insertOne({
    owner: email,
    roomName: roomName,
    participants: participants,
    messages: messages,
  });
}

export async function getAllRooms() {
  const client = await MongoClient.connect(uri);
  const db = await client.db("Exam");
  const collection = db.collection("room");
  return await collection.find({}).toArray();
}

export async function getRoomBasedOnRoomName(roomName) {
  console.log("Searching for room with name: ", roomName);

  const client = await MongoClient.connect(uri);
  const db = await client.db("Exam");
  const collection = db.collection("room");
  const room = await collection.findOne({ roomName });

  console.log("Found room: ", room);

  return room;
}
export async function getMessagesBasedOnRoomName(roomName) {
  console.log("Searching for messages in room with name: ", roomName);

  const client = await MongoClient.connect(uri);
  const db = await client.db("Exam");
  const collection = db.collection("messages");
  const messages = await collection.find({ roomName }).toArray();

  console.log("Found messages: ", messages);

  return messages;
}

export async function addMessageToDb(username, user, message, roomName) {
  const client = await MongoClient.connect(uri);
  const db = await client.db("Exam");
  const collection = db.collection("messages");
  return await collection.insertOne({
    username: username,
    user: user,
    message: message,
    roomName: roomName,
  });
}
