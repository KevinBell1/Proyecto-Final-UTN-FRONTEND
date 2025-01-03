import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginScreen, RegisterScreen, TaskScreen } from './Screens'
import './app.css'
const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element= {<LoginScreen/>} /> 
                <Route path="/login" element={<LoginScreen/>} />
                <Route path="/register" element={<RegisterScreen/>} />
                <Route path="/home" element={<TaskScreen/>} />
                
            </Routes>
        </>
    )
}

export default App
