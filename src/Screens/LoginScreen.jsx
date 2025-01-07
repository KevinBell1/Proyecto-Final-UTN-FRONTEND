import React, { useContext } from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

const LoginScreen = () => {
    const { formState, handleChange } = useForm({
        email: '',
        password: ''
    })

    const [generalError, setGeneralError] = useState('')

    const {login} = useContext(AuthContext)
	const navigate  = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()

        setGeneralError('')

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        
        const data = await responseHTTP.json()

        if(!data.ok){
			if (data.code === "INCORRECT_PASSWORD") {
                setErrors({ password: [data.message] });
                alert(data.message) // todo, configurar el css para ubicar el mensaje debajo del input
            } else if(data.code === 'VALIDATION_ERROR'){
                setErrors(data.data || {});
            }else {
                setGeneralError(data.message || 'Error al iniciar session');
            }
            return;
        }
		
    }

    return (
        <div className='register-container'>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className='register-box'>
                <div className='input-container'>
                    <label>Ingresa tu email</label>
                    <input
                        name='email'
                        id='email'
                        placeholder='Example@example.com'
                        type="email"
                        onChange={handleChange}
                        value={formState.email}
                        className='todo-input'
                    />
                </div>
                <div className='input-container'>
                    <label>Ingresa tu contraseña</label>
                    <input
                        name='password'
                        id='password'
                        placeholder='Ingresa tu password'
                        type="password"
                        onChange={handleChange}
                        value={formState.password}
                        className='todo-input'
                    />
                </div>
                <div className='btns'>
                    <button type='submit' className='btn'>Iniciar sesión</button>
                    <Link to='/register' className='btn'>No tengo una cuenta</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen