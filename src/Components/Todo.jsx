import React from 'react'




const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
    return (
        <div className='todo'>
            <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)} >{task.task}</p>
            <div>
                {/* <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)}/>
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)}/> */}
            </div>
        </div>
    )
}

export default Todo