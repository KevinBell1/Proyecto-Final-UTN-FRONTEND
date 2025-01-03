
import useForm from '../Hooks/useForm'
const EditTodoForm = ({editTodo, task}) => {
    const { formState, handleChange, setFormState } = useForm({
            task: task.task,
        })

        const handleSubmitTask = async (e) => {
            e.preventDefault()

            editTodo(formState.task, task.id)
            setFormState({ ...formState, task: '' });
    };
    return (
            <form onSubmit={handleSubmitTask} className='register-box'>
                <div className='input-container'>
                    <input
                        name='task'
                        id='task'
                        placeholder='Update task'
                        type="text"
                        onChange={handleChange}
                        value={formState.task}
                        className='todo-input'
                    />
                </div>
                <div className='btns'>
                    <button type='submit' className='btn'>Listo</button>
                </div>
            </form>
    )
}

export default EditTodoForm