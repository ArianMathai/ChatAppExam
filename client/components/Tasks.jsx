import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../context/LoginContext";
import Login from "./Login";
import AddTask from "./AddTask";

function Tasks(){

    const {user} = useContext(LoginContext);
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")


    async function fetchTasks(){
        const res = await fetch("/api/tasks/getAllTasks");
        const data = await res.json();

        if (res.ok){
            setTasks(data.tasks);
        }
        setErrorMessage(data.message);
    }


    useEffect(() => {
        fetchTasks()
    }, []);



    return user?.email ? (
        <>
            <h2>Tasks</h2>
            <h3>{errorMessage}</h3>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div className="task-list-task">
                            {task.title}
                        </div>
                    </li>
                ))}
            </ul>
            <AddTask fetchTasks={fetchTasks}/>
        </>
    ) : (
        <Login />
    );
}
export default Tasks;