import styles from './Register.module.css';

// HOOKS
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../../../hooks/useApi';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// components
import MessageErrorForm from '../../../components/Geral/MessageErrorForm/MessageErrorForm';
import BackButton from '../../../components/Geral/BackButton/BackButton'
import Loading from '../../../components/Geral/Loading/Loading'

const schema = yup.object().shape({
    name:
        yup.string()
            .required('O nome é Obrigatório')
            .max(45, 'O nome não pode exceder 45 caracteres.'),
    email:
        yup.string().uppercase('A tecla CapsLock está ativada')
            .required('O email é obrigatório')
            .email('Formato de E-mail inválido')
            .lowercase(),
    password:
        yup.string()
            .required('A senha é obrigatória')
            .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    confirmPassword:
        yup.string()
            .oneOf([yup.ref('password'), null], 'A senhas devem ser iguais')
            .required('A confirmação de senha é Obrigatória'),
})


const Register = () => {

    const { fetchData, data } = useApi()

    const [visible, setVisible] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const handleSubmitData = async (data) => {
        await fetchData('auth/register', 'POST', data, '/login')
    }

    return (
        <div className={styles.container}>

            <BackButton to={"login"} />

            <div className={styles.form}>

                <h2>Novo Cadastro</h2>

                <form onSubmit={handleSubmit(handleSubmitData)}>

                    <label>
                        <span>Nome:</span>
                        <input
                            type="text"
                            placeholder='Digite apenas seu nome e sobrenome'
                            {...register('name')}
                        />
                        <i id={styles.icons} className="bi-person-fill" ></i>

                        {errors.name && <MessageErrorForm message={errors.name.message} />}

                    </label>

                    <label>
                        <span>E-mail:</span>
                        <input
                            type="email"
                            placeholder='Ex: teste@embasa.ba.gov.br'
                            {...register('email')}
                        />
                        <i id={styles.icons} className="bi-envelope-fill" ></i>

                        {errors.email && <MessageErrorForm message={errors.email.message} />}

                    </label>

                    <label>
                        <span>Senha:</span>
                        <input
                            type={visible ? "text" : "password"}
                            placeholder='Crie uma senha'
                            autoComplete='on'
                            {...register('password')}
                        />
                        <i
                            id={styles.icons}
                            onClick={() => setVisible(!visible)}
                            className={visible ? "bi-eye-fill" : "bi-eye-slash-fill"}
                        >
                        </i>

                        {errors.password && <MessageErrorForm message={errors.password.message} />}

                    </label>

                    <label>
                        <span>Confirmação de senha:</span>
                        <input
                            type={visible ? "text" : "password"}
                            placeholder='Confirme as senhas'
                            autoComplete='on'
                            {...register('confirmPassword')}
                        />

                        {errors.confirmPassword && <MessageErrorForm message={errors.confirmPassword.message} />}

                    </label>

                    <button
                        id={styles.button_submit}
                        className='btn'
                        disabled={isSubmitting}
                    >
                        <span>{isSubmitting ? <Loading /> : 'Cadastrar'}</span>
                    </button>
                </form>
            </div>
        </div>
    )

};

export default Register