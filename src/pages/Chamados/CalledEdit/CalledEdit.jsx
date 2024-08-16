import styles from './CalledEdit.module.css'

// COMPONENTS
import BackButton from '../../../components/Geral/BackButton/BackButton'
import Loading from '../../../components/Geral/Loading/Loading';
import FormChamado from '../../../components/Chamados/Form_chamado/FormChamado/FormChamado'

//HOOKS
import { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useFormValidator } from '../../../hooks/useFormValidator';
import { useNavigate } from 'react-router-dom';
// CONTEXT
import { useAuth } from '../../../context/AuthProvider';

const CalledEdit = () => {

    const navigate = useNavigate()

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
        append({ title: '', createdAt: new Date(), criado_por: user.name })
    }

    function registro_edicoes(novos_dados, dados_antigos) {

        const valoresAlterados = Object.keys(dados_antigos).reduce((acc, key) => {
            if (key === 'extravasando') {
                const antigoBoolean = Boolean(dados_antigos.extravasando);
                const novoBoolean = Boolean(JSON.parse(novos_dados.extravasando));

                if (antigoBoolean !== novoBoolean) {
                    acc[key] = {
                        valor_antigo: antigoBoolean,
                        novo_valor: novoBoolean
                    };
                }
            } else if (dados_antigos[key] !== novos_dados[key]) {
                acc[key] = {
                    valor_antigo: dados_antigos[key],
                    novo_valor: novos_dados[key]
                };
            }
            return acc;
        }, {});

        valoresAlterados.id_user_edicao = user.id

        valoresAlterados.id_chamado = id

        delete valoresAlterados.estacao
        delete valoresAlterados.atualizacoes
        delete valoresAlterados.chamado_eletromecanico
        delete valoresAlterados.criado_por

        return valoresAlterados;
    }

    const handleSubmitData = async (dados) => {

        if (dados.horaInicioPippe.trim().replace(/_/g, '') === '') {
            setValue('horaInicioPippe', '')
        }

        const obter_registro_de_edicao = registro_edicoes(dados, data)

        try {
            await fetchData(`called/editCall/${id}`, 'PATCH', dados, '/', token)
            await fetchData('called/registerEdit', 'POST', obter_registro_de_edicao, '/', token)
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
        addAtualization,
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