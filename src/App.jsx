import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginScreen, RegisterScreen } from './Screens'


const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element= {<LoginScreen/>} /> 
                <Route path="/login" element={<LoginScreen/>} />
                <Route path="/register" element={<RegisterScreen/>} />
                
            </Routes>
        </>
    )
}

export default App
