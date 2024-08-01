import { createContext, useContext, useState } from "react";
import { useAuthorization } from "../hooks/useAuthorization";

const AuthContext = createContext({})


const AuthProvider = ({ children }) => {

    const { login, logout, user, options, permissions, authorization, setUser } = useAuthorization()  


    return (
        <AuthContext.Provider value={{ user, permissions, options, login, logout, authorization }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, AuthContext, useAuth }