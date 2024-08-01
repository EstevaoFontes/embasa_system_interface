import styles from './NewEEE.module.css'

// components
import DataStation from '../../../components/Estação/EeeComponentsEdit/DataStation/DataStation'
import Diagnostic from '../../../components/Estação/EeeComponentsEdit/Diagnostic/Diagnostic'
import Eletromecanic from '../../../components/Estação/EeeComponentsEdit/Eletromecanic/Eletromecanic'
import Operation from '../../../components/Estação/EeeComponentsEdit/Operation/Operation'
import ImageRegister from '../../../components/Estação/EeeComponentsEdit/ImageRegister/ImageRegister'
import Steps from '../../../components/Estação/EeeComponentsEdit/Steps/Steps'
import BackButton from '../../../components/Geral/BackButton/BackButton'

// hook
import { useForms } from '../../../hooks/useForms'
import { useForm } from 'react-hook-form'
import { useApi } from '../../../hooks/useApi'
import Loading from '../../../components/Geral/Loading/Loading'


const NewEEE = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { fetchData } = useApi()

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, getValues } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        // resolver? yupResolver(schema)
    })

    const formComponents = [<DataStation register={register} />, <Eletromecanic register={register} />,
    <Diagnostic register={register} />, <Operation register={register} />, <ImageRegister setValue={setValue} getValues={getValues} />]


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
            await fetchData('estacao/newEEE/', 'POST', form_data, '/eee', token)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            {!isSubmitting && <BackButton to={"eee"} />}

            <h1>Criar uma Nova Estação Elevatória</h1>

            <div className={styles.container_float}>
                {!isSubmitting && (
                    <Steps currentStep={currentStep} changeStep={changeStep} />
                )}

                <form onSubmit={handleSubmit(handleSubmitData)}>

                    <div className={styles.action}></div>

                    <div className={styles.container_form}> {currentComponents}</div>

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
            </div>
        </div>
    )
}

export default NewEEE