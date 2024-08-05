import styles from './ModalFinalizarChamadoEletromecanico.module.css';

// components
import Loading from '../../../Geral/Loading/Loading';
import InputMask from 'react-input-mask';

// hooks
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { useAuth } from '../../../../context/AuthProvider';
import { useSearchParams } from 'react-router-dom';


const ModalFinalizarChamadoEletromecanico = ({ openModalFinalizar, getData }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [indevido, setIndevido] = useState(false)

    const { fetchData } = useApi()

    const { user } = useAuth()

    const { register, handleSubmit, formState: { isSubmitting }, setValue, unregister } = useForm()

    const [searchParams] = useSearchParams()

    const id = Number(searchParams.get('id'))

    async function handleSubmitData(data) {
        try {
            if (indevido) {
                await fetchData('chamadosEletromecanicos/indevidoCalled', 'PATCH', data, null, token)
            } else {
                await fetchData('chamadosEletromecanicos/finishCalled', 'PATCH', data, null, token)
            }

        } catch (error) {

            console.log(error)

        } finally {
            openModalFinalizar(state => !state)
            getData()
        }

    }

    useEffect(() => {
        setValue('id_user_finalizacao', user?.id)
        setValue('id_chamado', id)
    }, [])

    useEffect(() => {
        if (indevido == true) {
            unregister(['observacao_final', 'data_hora_fim'])
            setValue('indevido', indevido)
        }
    }, [indevido])

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
                            disabled={indevido}
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
                            disabled={indevido}
                        />
                    </label>

                    <div className={styles.checkWrong}>
                        <span>Chamado indevido ?</span>
                        <input
                            type="checkbox"
                            onChange={() => setIndevido(state => !state)}
                            id="chk"
                        />
                        <label htmlFor='chk' className={styles.switch}>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    {indevido ? (
                        <div className={styles.formWrong}>
                            <label>
                                <span>Motivo</span>
                                <input
                                    type="text"
                                    placeholder='Informe o Motivo'
                                    {...register("observacaoIndevido")}
                                />
                            </label>
                        </div>
                    ) : (
                        <></>
                    )}

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