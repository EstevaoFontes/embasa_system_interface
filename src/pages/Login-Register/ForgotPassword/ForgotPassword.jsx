import styles from './ForgotPassword.module.css';

import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import MessageErrorForm from '../../../components/Geral/MessageErrorForm/MessageErrorForm';
import BackButton from '../../../components/Geral/BackButton/BackButton';

const schema = yup.object().shape({
    email:
        yup.string()
            .email('Insira um E-mail valido')
            .required('Campo Obrigatório')
});

function handleSubmitData(data) {
    console.log(data)
}

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    return (
        <div className={styles.container}>
            <BackButton  to={"login"}/>

            <div className={styles.form}>
                <h2>Redefinição de senha</h2>
                <p>Será enviado um E-mail para redefinição de senha</p>
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    <label>
                        <span>E-mail cadastrado:</span>
                        <input
                            type="email"
                            placeholder="Insira o Email cadastrado"
                            {...register('email')}
                        />
                        {errors.email && <MessageErrorForm message={errors.email.message} />}
                    </label>
                    <button className="btn">Recadastrar senha</button>
                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;