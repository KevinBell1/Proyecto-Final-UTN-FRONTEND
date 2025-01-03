import React, { useState } from 'react'
import useForm from '../Hooks/useForm'

const RegisterScreen = () => {
    const { formState, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    })
    const handleRegister = async (e) => {
        e.preventDefault()
        console.log('Formulario enviado con exito')

        const responseHTTP = await fetch(`proyecto-final-utn-taupe.vercel.app
/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        console.log(responseHTTP)
        const data = await responseHTTP.json()
        console.log(data)
    }

    return (
        <div className='register-container'>
            <h1>Registrate en Brand name</h1>
            <form onSubmit={handleRegister} className='register-box'>
                <div className='input-container'>
                    <label>Ingresa tu nombre</label>
                    <input
                        name='name'
                        id='name'
                        placeholder='Ingresa tu nombre'
                        type="text"
                        onChange={handleChange}
                        value={formState.name}
                        className='todo-input'
                    />
                </div>
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
                <button type='submit' className='btn'>Enviar</button>
            </form>
        </div>
    )
}

export default RegisterScreen