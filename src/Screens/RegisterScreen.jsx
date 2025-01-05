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

    const validateForm = () => {
        const newErrors = {};
    
        if (!formState.name) {
            newErrors.name = ['El nombre es obligatorio.'];
        }
    
        if (!formState.email) {
            newErrors.email = ['El email es obligatorio.'];
        }
    
        if (!formState.password) {
            newErrors.password = ['La contraseña es obligatoria.'];
        }
    
        return newErrors;
    }
    
    const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); // Si hay errores, actualizar el estado
            setLoading(false);
            return; // Detener el envío del formulario si hay errores
        }

    const handleRegister = async (e) => {
        e.preventDefault()

        // Establecer loading en true cuando inicie el proceso
        setLoading(true);
        setErrors({})

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
                // Si hay errores, actualizar el estado de los errores
                setErrors(data.data || {});
                throw new Error(data.message || 'Error al registrar usuario');
            }

            console.log('Registro exitoso', data);
            navigate('/login')
        } catch (error) {
            console.error('Error en el registro:', error);
            alert(`Hubo un problema: ${error.message}`);
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