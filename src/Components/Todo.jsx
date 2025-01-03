import React from 'react'
import { FaTrash } from "react-icons/fa"
import { FaRegEdit } from "react-icons/fa";



const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
    return (
        <div className='todo'>
            <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)} >{task.task}</p>
            <div>
                <FaRegEdit className="edit-icon" onClick={() => editTodo(task.id)}/>
                <FaTrash className="delete-icon" onClick={() => deleteTodo(task.id)}/>
            </div>
        </div>
    )
}

export default Todo