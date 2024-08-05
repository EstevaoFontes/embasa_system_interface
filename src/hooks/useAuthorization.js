import { useState, useEffect } from "react";

export const useAuthorization = () => {

    const [authorization, setAuthorization] = useState(false)

    const [user, setUser] = useState({})

    const options = ['Gerente', 'Sala de Controle', 'Manutenção','Visitante'];

    const permissions = {
        pages: ['Gerente'],
        called_finish: ['Gerente', 'Sala de Controle'],
        edit_called: ['Gerente', 'Sala de Controle'],
        area_manutencao_called: ['Gerente', 'Manutenção'],
        information_called_manutencao: ['Manutenção'],
        nova_estacao: ['Gerente']
    };

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user){
            setUser(JSON.parse(user))
        }else{
            setUser({})
        }
    },[])


    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if(token && user){
            setAuthorization(true)
        }else{
            setAuthorization(false)
        }

    },[])


    function login(user, token) {

        setUser(user)

        setAuthorization(true)

        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))
    }


    function logout() {

        setAuthorization(false)

        localStorage.removeItem('token')
        localStorage.removeItem('user')

    }


    function isAuth() {
        const token = localStorage.getItem('token')

        if (!token) {
            return false
        }

        return true
    }

    return {
        login,
        logout,
        user,
        options,
        permissions,
        authorization,
        isAuth,
        setUser
    }
}