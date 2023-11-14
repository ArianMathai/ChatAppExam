import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config();


const uri = process.env.MONGODB;
export async function fetchTasks(){

    const client = await MongoClient.connect(uri);
    const db = await client.db("TaskAppMockExam");
    const collection = db.collection("tasks");
    return await collection.find({}).toArray();
}

export async function addTask(title, isDone){
    const client = await MongoClient.connect(uri);
    const db = await client.db("TaskAppMockExam");
    const collection = db.collection("tasks");
    return await collection.insertOne({title:title, isDone:isDone})
}