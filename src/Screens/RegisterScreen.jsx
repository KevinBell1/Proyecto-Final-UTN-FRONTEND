import React, { useState } from 'react'
import useForm from '../Hooks/useForm'
import { useNavigate } from 'react-router-dom'

const RegisterScreen = () => {
    const navigate = useNavigate()
    const { formState, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    })

    // Estado para almacenar los errores de validación
    const [errors, setErrors] = useState({});
    // Estado para manejar el estado de carga (loading)
    const [loading, setLoading] = useState(false)
    // Estado para manejar mensajes generales de error
    const [generalError, setGeneralError] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        // Establecer loading en true cuando inicie el proceso
        setLoading(true);
        setErrors({})
        setGeneralError('')

        try {
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })

            const data = await responseHTTP.json()

            if (!responseHTTP.ok) {

                if (data.code === "EMAIL_ALREADY_REGISTERED") {
                    setErrors({ email: [data.message] });
                    alert(data.message) // todo, configurar el css para ubicar el mensaje debajo del input
                } else if(data.code === 'VALIDATION_ERROR'){
                    setErrors(data.data || {});
                }else {
                    setGeneralError(data.message || 'Error al registrar usuario');
                }
                return;
            }

            console.log('Registro exitoso', data);
            navigate('/login')
        } catch (error) {
            console.error('Error en el registro:', error);
            setGeneralError('Hubo un problema al registrar. Inténtalo nuevamente más tarde.');
        }
        finally {
            setLoading(false);
        }
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
                    {errors.name && <p className="error-text">{errors.name.join(", ")}</p>}
                    {generalError && <p className="error-banner">{generalError}</p>}
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
                    {errors.email && <p className="error-text">{errors.email.join(", ")}</p>}
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
                    {errors.password && <p className="error-text">{errors.password.join(", ")}</p>}
                </div>
                <button type='submit' className='btn'>{loading ? 'Cargando...' : 'Enviar'}</button>
                {loading && <div className="spinner"></div>}
            </form>
        </div>
    )
}

export default RegisterScreen