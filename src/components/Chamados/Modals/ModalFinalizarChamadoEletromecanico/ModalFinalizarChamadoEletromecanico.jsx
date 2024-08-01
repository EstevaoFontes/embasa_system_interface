import styles from './ModalFinalizarChamadoEletromecanico.module.css';

// components
import Loading from '../../../Geral/Loading/Loading';
import InputMask from 'react-input-mask';

// hooks
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { useAuth } from '../../../../context/AuthProvider';
import { useSearchParams } from 'react-router-dom';


const ModalFinalizarChamadoEletromecanico = ({ openModalFinalizar, getData }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { fetchData } = useApi()

    const { user } = useAuth()

    const { register, handleSubmit, formState: { isSubmitting }, setValue } = useForm()

    const [searchParams] = useSearchParams()

    const id = searchParams.get('id')

    async function handleSubmitData(data) {

        try {
            await fetchData('chamadosEletromecanicos/finishCalled', 'PATCH', data, null, token)

        } catch (error) {

            console.log(error)

        } finally {
            openModalFinalizar(state => !state)
            getData()
        }

    }

    useEffect(() => {
        setValue('finalizado_por', user?.id)
        setValue('id_chamado', id)
    }, [])

    return (
        <div className={styles.background} >
            <div className={styles.modalFinish}>

                <h2>Finalizar Chamado</h2>

                <form onSubmit={handleSubmit(handleSubmitData)}>

                    <label>
                        <span>Data/ Hora Fim</span>
                        <InputMask
                            alwaysShowMask
                            mask={'99/99/9999 - 99:99'}
                            className={styles.input}
                            {...register("data_hora_fim")}
                        />
                    </label>

                    <label>
                        <span>Usuário Finalização</span>
                        <input
                            id={styles.formatedInformations}
                            type="text"
                            disabled
                            value={user.name}
                        />
                    </label>


                    <label>
                        <span>Observação de Encerramento</span>
                        <input
                            {...register('observacao_final')}
                            type="text"
                            className={styles.input}
                            placeholder='Digite uma observação de encerramento'
                        />
                    </label>

                    <div className={styles.button}>
                        {
                            isSubmitting ? (

                                <Loading />

                            ) : (

                                <>
                                    <button className='btn_custom2' type='submit'>
                                        Salvar
                                    </button>
                                    <button className='btn_custom3' type='button' onClick={() => openModalFinalizar(state => !state)}>
                                        Fechar
                                    </button>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalFinalizarChamadoEletromecanico