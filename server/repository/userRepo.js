import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB;

export async function addUserToDb(username, email) {
  const client = await MongoClient.connect(uri);
  const db = client.db("Exam");
  const collection = db.collection("user");

  const existingUser = await collection.findOne({ email: email });

  if (existingUser) {
    console.log("User already exists in the database.");
    return { acknowledged: true, message: "User already exists" };
  }

  if (username && email) {
    return await collection.insertOne({ username: username, email: email });
  } else {
    console.log("Username or email is null. User not added to the database.");
    return { acknowledged: false, message: "Username or email is null" };
  }
}
export async function getAllUsers() {
  const client = await MongoClient.connect(uri);
  const db = client.db("Exam");
  const collection = db.collection("user");

  const projection = { username: 1, email: 1, bio: 1 };

  return await collection.find({}, { projection }).toArray();
}
export async function updateUserBio(email, newBio) {
  const client = await MongoClient.connect(uri);
  const db = client.db("Exam");
  const collection = db.collection("user");

  const updateResult = await collection.updateOne(
    { email: email },
    { $set: { bio: newBio } },
  );

  if (updateResult.modifiedCount > 0) {
    const updatedDocument = await collection.findOne({ email: email });
    return { success: true, bio: updatedDocument.bio };
  } else {
    return { success: false, message: "Update of bio not successful" };
  }
}
export async function getUserBio(email) {
  const client = await MongoClient.connect(uri);
  const db = client.db("Exam");
  const collection = db.collection("user");
  return await collection.findOne({ email });
}
