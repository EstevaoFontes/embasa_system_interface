import styles from './NovoChamado.module.css';

// COMPONENTS
import BackButton from '../../../components/Geral/BackButton/BackButton';
import FormChamado from '../../../components/Chamados/Form_chamado/FormChamado/FormChamado'

//HOOKS
import { useApi } from '../../../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useFormValidator } from '../../../hooks/useFormValidator';

const NewCalled = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { user } = useAuth()

    const { fetchData } = useApi()

    const { schema, yupResolver } = useFormValidator()

    const { register, handleSubmit, formState: { errors }, isSubmitting, setValue, getValues } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    })

    const handleSubmitData = async (data) => {
        try {
            await fetchData('called/newCalled', 'POST', data, '/', token)
        } catch (error) {
            console.log(error)
        }
    }

    const atributes = {
        register,
        handleSubmit,
        handleSubmitData,
        errors,
        isSubmitting,
        setValue,
        getValues
    }

    useEffect(() => {
        setValue('id_user_criado_por', user.id)
    }, [])


    return (
        <div className={styles.container}>
            <BackButton />
            <FormChamado 
            nome_titulo={'Novo Chamado'}
            nome_botao={'Salvar'}
            formAtributes={atributes}
            />
        </div>
    )
}

export default NewCalled;