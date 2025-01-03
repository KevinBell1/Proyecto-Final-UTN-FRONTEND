import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext() 

export const AuthProvider = ({children}) => {
    const [is_authenticated_state, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem('access-token')))
    useEffect(
        () => {
            Boolean(sessionStorage.getItem('access-token')) && setIsAuthenticatedState(true) 
        },
        []
    )
    const login = () => setIsAuthenticatedState(true)
    return (
        <AuthContext.Provider
        value={ 
            {
                is_authenticated_state,
                login
            }
        }
        >
            {children}
        </AuthContext.Provider>
    )
}