import styles from './Login.module.css';

// HOOKS
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi'


import { useAuth } from '../../../context/AuthProvider';
// YUP
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Componente
import MessageErrorForm from '../../../components/Geral/MessageErrorForm/MessageErrorForm';
import Loading from '../../../components/Geral/Loading/Loading';

const schema = yup.object().shape({
    email: yup.string()
        .email('Digite um E-mail válido')
        .required('O E-mail é obrigatório'),
    password: yup.string()
        .required('A Senha é obrigatória')
})

const Login = () => {


    const { fetchData, data } = useApi();

    const { login: loginUser, user } = useAuth();

    const [visible, setVisible] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    async function handleSubmitData(dados) {

        try {
            await fetchData('auth/login', 'POST', dados, null)
        } catch (error) {
            throw error
        }

    }

    useEffect(() => {
        if (data.length !== 0) {
            loginUser(data.user, data.token)
        }
    }, [data])

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <h1>Entrar</h1>
                <p>Faça login para acessar sua conta</p>

                <div >
                    <input
                        type="email"
                        placeholder="E-mail"
                        {...register('email')}
                    />
                    <i className='bi-person-fill'></i>
                    {errors.email && (
                        <div className={styles.error}>
                            <MessageErrorForm message={errors.email.message} color />
                        </div>
                    )}
                </div>

                <div>
                    <input
                        type={visible ? "text" : "password"}
                        placeholder="Senha"
                        autoComplete="on"
                        {...register('password')}
                    />

                    <i onClick={() => setVisible(state => !state)} className={visible ? "bi-eye-fill" : 'bi-eye-slash-fill'}></i>

                    <div className={styles.links_error}>
                        {errors.password && (
                            <div className={styles.error}>
                                <MessageErrorForm message={errors.password.message} color />
                            </div>
                        )}
                        <Link className={styles.forgot_password} to={'/login/forgotPassword'}>Esqueci minha senha</Link>
                    </div>
                </div>

                <button
                    id={styles.button}
                    disabled={isSubmitting}
                    className='btn'
                >
                    <span>{isSubmitting ? <Loading /> : "Entrar"}</span>
                </button>

                <Link className={styles.linkCadastro} to={'/login/register'}>Não tem conta? Criar agora</Link>
            </form>

        </div>
    )
}

export default Login