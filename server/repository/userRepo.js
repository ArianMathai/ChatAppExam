import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'

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

/*
export async function addUserToDb(username, email){

    const client = await MongoClient.connect(uri);
    const db = await client.db("Exam");
    const collection = db.collection("user");
    return await collection.insertOne({username: username, email:email});
}

 */

export async function addTask(title, isDone){
    const client = await MongoClient.connect(uri);
    const db = await client.db("TaskAppMockExam");
    const collection = db.collection("tasks");
    return await collection.insertOne({title:title, isDone:isDone})
}