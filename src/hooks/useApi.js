import { useState } from "react"
import { useNotification } from "./useNotification"
import { useNavigate } from "react-router-dom"

export const useApi = () => {

    const navigate = useNavigate()
    const { notifyError, notifySucess } = useNotification()
    const [data, setData] = useState([])
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const api_url = import.meta.env.VITE_API_URL


    async function fetchData(url, method, dados = null, navigateTo, token) {

        setLoading(true)
        setData([])

        try {

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            let body;

            if (dados) {
                if (dados instanceof FormData) {
                    body = dados;
                    // O Fetch API adiciona automaticamente o cabeçalho `Content-Type` correto para FormData.
                } else {
                    body = JSON.stringify(dados);
                    headers['Content-Type'] = 'application/json';
                }
            }

            const response = await fetch(`${api_url}${url}`, {
                method: method,
                body: body,
                headers: headers
            });

            // const response = await fetch(`${api_url}${url}`, {
            //     method: method,
            //     body: dados ? JSON.stringify(dados) : null,
            //     headers: {
            //         "Content-type": "application/json",
            //         'Authorization': `Bearer ${token}`
            //     }
            // })

            const response_data = await response.json()

            if (response_data.message) {
                notifySucess(response_data.message)
                navigate(navigateTo)
                return
            }

            if (response_data.error) {
                notifyError(response_data.error)
                return
            }

            setResponse(response)

            setData(response_data)

        } catch (error) {

            console.error(error)

        } finally {

            setLoading(false)
        }
    }


    return {
        loading,
        data,
        setData,
        fetchData,
        response
    }

}