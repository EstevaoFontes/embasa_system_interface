import styles from './CalledEdit.module.css'

// COMPONENTS
import BackButton from '../../../components/Geral/BackButton/BackButton'
import Loading from '../../../components/Geral/Loading/Loading';
import FormChamado from '../../../components/Chamados/Form_chamado/FormChamado/FormChamado'

//HOOKS
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useFormValidator } from '../../../hooks/useFormValidator';

// CONTEXT
import { useAuth } from '../../../context/AuthProvider';

const CalledEdit = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { user } = useAuth()

    const { schema, yupResolver } = useFormValidator()

    const { register, handleSubmit, formState: { errors }, isSubmitting, setValue, control, unregister, getValues } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    })

    const { fetchData, data, loading } = useApi()
    const { id } = useParams()


    const { fields, append, remove } = useFieldArray({
        control,
        name: 'atualizacoes'
    })


    function addAtualization() {
        append({ title: '', data: new Date().toLocaleString('pt-BR'), createBy: user.name })
    }

    const handleSubmitData = async (data) => {
        try {
            await fetchData(`called/editCall/${id}`, 'PATCH', data, '/', token)
        } catch (error) {
            console.log(error)
        }
    }

    async function getCalleds() {
        try {
            await fetchData(`called/getUniqueCall/${id}`, 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCalleds()
        return
    }, [])



    useEffect(() => {

        Object.keys(data).forEach(item => {

            if (item === 'atualizacoes') {
                return
            }

            setValue(item, data[item])
        })

        setValue('email', user.email)

    }, [data])

    const atributes = {
        register,
        handleSubmit,
        handleSubmitData,
        errors,
        isSubmitting,
        setValue,
        data,
        fields,
        remove,
        addAtualization
    }



    if (loading) {
        return (
            <div className={styles.loading}>
                <Loading />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <BackButton />
            <FormChamado
                nome_titulo={'Editar Chamado'}
                nome_botao={'Atualizar'}
                formAtributes={atributes}
                showField
            />
        </div >
    )
}

export default CalledEdit 