import express from "express";
import {addTask, fetchTasks} from "../repository/taskRepo.js";


export const taskRoutes = express.Router();

taskRoutes.get("/getAllTasks", async (req, res) => {
    const tasks = await fetchTasks();

    if (tasks.length === 0){
        return res.status(404).json({message: "No tasks found!", tasks:tasks});
    }else {
        return res.status(200).json({message: "Tasks retrieved", tasks: tasks});
    }
})

taskRoutes.post("/addTask", async (req, res) => {
    const {task} = req.body;

    const result = await addTask(task.title, task.isDone);

    if (!result.acknowledged){
        return {message: "Failed to post task", posted:false}
    }else{
        return {message: "Posted task", posted:true}
    }
})