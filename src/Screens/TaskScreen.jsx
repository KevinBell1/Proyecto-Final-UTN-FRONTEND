import React, { useEffect, useState } from 'react'
import TodoForm from '../Components/TodoForm'
import Todo from '../Components/Todo';
import EditTodoForm from '../Components/EditTodo';
import getAuthenticateHeaders from '../utils/fetching';

const TaskScreen = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        console.log('Todos actualizados:', todos);
    }, [todos])

    const addTodo = async (todo) => {
        const newTodo = {
            task: todo,
            completed: false,
            isEditing: false
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task`, {
                method: 'POST',
                headers: getAuthenticateHeaders(),
                body: JSON.stringify(newTodo),
            })

            if (!response.ok) {
                throw new Error("Error al crear la tarea");
            }

            const savedTodo = await response.json()
            console.log(savedTodo)
            setTodos([
                ...todos,
                {
                    _id: savedTodo._id,  // Asegúrate de que se esté utilizando el _id de la respuesta
                    task: savedTodo.task,  // Utiliza el campo task de la respuesta
                    completed: !savedTodo.active,  // Asumiendo que el campo 'active' es el que indica si la tarea está completa
                    isEditing: false,
                }
            ])
        } catch (error) {
            console.error(error.message)
            console.log(error)
        }
    }

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    const deleteTodo = (id) => {

        fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}`, {
            method: 'DELETE',
            headers: getAuthenticateHeaders(),

        })
        setTodos(todos.filter((todo) => todo._id !== id))

    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = async  (task, id) => {
        

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}`, {
            method: 'PUT',
            headers: getAuthenticateHeaders(),
            body: JSON.stringify({ task_data: { task } })
        })
        const updatedTodo = await response.json();
        console.log(updatedTodo)
        setTodos(
            todos.map((todo) =>
                todo._id === id ? { ...todo, task: task, isEditing: !todo.isEditing } : todo
            )
        )
    }
    return (
        <div className='register-container'>
            <h1>Empecemos!!</h1>
            <TodoForm addTodo={addTodo} />
            {

                todos.map((todo) => (

                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} key={todo._id} />
                    ) : (
                        <Todo task={todo} key={todo._id} toggleComplete={toggleComplete} deleteTodo={() => deleteTodo(todo._id)} editTodo={editTodo} />
                    )
                ))
            }
        </div>

    )
}

export default TaskScreen
