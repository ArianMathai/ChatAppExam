import { useState } from "react";

function AddTask({fetchTasks}) {
    const [title, setTitle] = useState("");
    const [isDone, setIsDone] = useState(false);

    async function onAddTask(task){
        const res = await fetch("/api/tasks/addTask", {
            method: "POST",
            body: JSON.stringify({task}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        await fetchTasks();

    }

    const handleAddTask = () => {
        console.log("isDone: " + isDone)
        // Validate if the title is not empty
        if (title.trim() === "") {
            alert("Please enter a title for the task.");
            return;
        }

        // Create a new task object
        const newTask = {
            title: title,
            isDone: isDone,
        };

        // Pass the new task to the parent component
        onAddTask(newTask);

        // Reset the input fields
        setTitle("");
        setIsDone(false);
    };

    return (
        <div>
            <h2>Add Task</h2>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Done:
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => setIsDone(!isDone)}
                />
            </label>
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default AddTask;
