import styles from './EditEEE.module.css'

// Components
import DataStation from '../../../components/Estação/EeeComponentsEdit/DataStation/DataStation'
import Diagnostic from '../../../components/Estação/EeeComponentsEdit/Diagnostic/Diagnostic'
import Eletromecanic from '../../../components/Estação/EeeComponentsEdit/Eletromecanic/Eletromecanic'
import Operation from '../../../components/Estação/EeeComponentsEdit/Operation/Operation'
import ImageRegister from '../../../components/Estação/EeeComponentsEdit/ImageRegister/ImageRegister'
import Steps from '../../../components/Estação/EeeComponentsEdit/Steps/Steps'
import BackButton from '../../../components/Geral/BackButton/BackButton'
import Loading from '../../../components/Geral/Loading/Loading'

// Hooks
import { useForms } from '../../../hooks/useForms'
import { useForm } from 'react-hook-form'
import { useApi } from '../../../hooks/useApi'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const EditEEE = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { data, fetchData, loading } = useApi()

    const images = data.imagens

    const { id } = useParams()

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, getValues } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        // resolver? yupResolver(schema)
    })

    const formComponents = [<DataStation register={register} />, <Eletromecanic register={register} />,
    <Diagnostic register={register} />, <Operation register={register} />, <ImageRegister setValue={setValue} img={images} />]


    const { currentStep, currentComponents, changeStep, isFirstStep, isLastStep } = useForms(formComponents)


    const handleSubmitData = async (data) => {
        const form_data = new FormData()

        await Object.keys(data).forEach(key => {
            if (key === 'imagens') {
                for (let i = 0; i < data[key].length; i++) {
                    form_data.append('imagens', data[key][i])
                }
            } else if (key === 'legenda') {
                for (let i = 0; i < data[key].length; i++) {
                    form_data.append('legenda', data[key][i])
                }
            } else {
                form_data.append(key, data[key])
            }
        })

        try {
            await fetchData(`estacao/editEEE/${id}`, 'PATCH', form_data, '/eee', token)
        } catch (error) {
            console.log(error)
        }

    }

    async function getUniqueEstacao() {
        await fetchData(`estacao/uniqueEEE/${id}`, 'GET', null, null, token)
    }

    useEffect(() => {
        getUniqueEstacao()

        return
    }, [])

    useEffect(() => {

        Object.keys(data).forEach(item => {

            setValue(item, data[item])
        })

    }, [data])

    return (
        <div className={styles.container}>
            {!isSubmitting && <BackButton to={"eee"} />}

            <h1>Editar Dados da Estação</h1>

            <div className={styles.container_float}>

                {loading ? (
                    <div className={styles.loading}>
                        <Loading />
                    </div>
                ) : (
                    <>
                        {!isSubmitting && (
                            <Steps currentStep={currentStep} changeStep={changeStep} />
                        )}

                        <form onSubmit={handleSubmit(handleSubmitData)}>

                            <div className={styles.action}></div>

                            <div className={styles.container_form}>
                                {currentComponents}
                            </div>

                            <div className={styles.container_button}>

                                {!isSubmitting && !isFirstStep && (
                                    <button
                                        className={styles.btn_back}
                                        type='button'
                                        onClick={() => changeStep(currentStep - 1)}
                                        disabled={isSubmitting}
                                    >
                                        <i className='bi-caret-left-fill'></i>
                                        <span>Voltar</span>
                                    </button>
                                )}

                                {!isSubmitting && !isLastStep && (
                                    <button type='button' className={styles.btn_next} onClick={(e) => changeStep(currentStep + 1, e)}>
                                        <span>Avançar</span>
                                        <i className='bi-caret-right-fill'></i>
                                    </button>
                                )}

                                {!isSubmitting && isLastStep && (

                                    <button type='submit' className={styles.btn_next} disabled={isSubmitting}>
                                        <span>Salvar</span>
                                    </button>
                                )}

                                {isSubmitting && <Loading />}


                            </div>

                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default EditEEE