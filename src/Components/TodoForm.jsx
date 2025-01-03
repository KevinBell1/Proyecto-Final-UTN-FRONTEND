
import useForm from '../Hooks/useForm'
const TodoForm = ({addTodo}) => {
    const { formState, handleChange, setFormState } = useForm({
            task: '',
        })

        const handleSubmitTask = async (e) => {
            e.preventDefault()

            addTodo(formState.task)
            setFormState({ ...formState, task: '' });
    };
    return (
            <form onSubmit={handleSubmitTask} className='register-box'>
                <div className='input-container'>
                    <input
                        name='task'
                        id='task'
                        placeholder='Cual es la actividad de hoy?'
                        type="text"
                        onChange={handleChange}
                        value={formState.task}
                        className='todo-input'
                    />
                    <div>
                        
                    </div>
                </div>
                <div className='btns'>
                    <button type='submit' className='btn'>Agregar</button>
                </div>
            </form>
    )
}

export default TodoForm