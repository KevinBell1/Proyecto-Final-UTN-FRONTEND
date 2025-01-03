import React, { useContext } from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

const LoginScreen = () => {
    const { formState, handleChange } = useForm({
        email: '',
        password: ''
    })
    const {login} = useContext(AuthContext)
	const navigate  = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()

        const responseHTTP = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        console.log(responseHTTP)
        const data = await responseHTTP.json()
        console.log(data)
        if(!data.ok){
			//Manejaran los estados de error
		}
		else{
			sessionStorage.setItem('access_token', data.data.access_token) 
            login()
			navigate('/home')
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