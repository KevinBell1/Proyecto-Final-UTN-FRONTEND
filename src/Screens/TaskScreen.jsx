import React, { useEffect, useState } from 'react'
import TodoForm from '../Components/TodoForm'
import { v4 as uuidv4 } from 'uuid';
import Todo from '../Components/Todo';
import EditTodoForm from '../Components/EditTodo';
import getAuthenticateHeaders from '../utils/fetching';
uuidv4();

const TaskScreen =  () => {
    const [todos, setTodos] = useState([]) 

    useEffect(() => {
        console.log('Todos actualizados:', todos);
    }, [todos])

    const addTodo = async (todo) => {
        const newTodo = {
            id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false,
            user_id: sessionStorage.getItem('user_id')
        }

        const response = await fetch('proyecto-final-utn-taupe.vercel.app/api/task', {
            method: 'POST',
            headers: getAuthenticateHeaders(),  
            body: JSON.stringify(newTodo),
        })


        const user_id = sessionStorage.getItem('user_id')
        const response2 = await fetch(`proyecto-final-utn-taupe.vercel.app/api/task/${user_id}`, {
            method: 'GET', 
            headers: getAuthenticateHeaders(), 
        });

        const tasksList = await response.json();

        setTodos([...todos, newTodo]) 
    }

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    const deleteTodo = (id) => {
        fetch(`proyecto-final-utn-taupe.vercel.app/api/task/${id}`, {
            method: 'DELETE',
            headers: getAuthenticateHeaders(),

        })
            setTodos(todos.filter((todo) => todo.id !== id))
        
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
            )
        );
        
    };

    return (
        <div className='register-container'>
            <h1>Empecemos!!</h1>
            <TodoForm addTodo={addTodo} />
            {
                todos.map((todo) => (
                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                    ) : (
                        <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                    )
                ))
            }
        </div>

    )
}

export default TaskScreen