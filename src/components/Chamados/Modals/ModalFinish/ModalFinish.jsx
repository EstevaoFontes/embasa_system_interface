import styles from './ModalFinish.module.css';

// components
import Loading from '../../../Geral/Loading/Loading';
import InputMask from 'react-input-mask';

// hooks
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { useAuth } from '../../../../context/AuthProvider';
import { useSearchParams } from 'react-router-dom';


const ModalFinish = ({ setFinishModal, getCalleds }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [dataAtualUser] = useState(new Date().toLocaleString('pt-BR'))

    const { fetchData } = useApi()

    const { user } = useAuth()

    const [indevido, setIndevido] = useState(false)

    const { register, handleSubmit, formState: { isSubmitting }, setValue, unregister } = useForm()

    const [searchParams] = useSearchParams()

    const id = searchParams.get('id')

    const finalDate = searchParams.get('hour')


    async function handleSubmitData(data) {
        try {
            if (indevido) {
                await fetchData(`called/indevidoCalled/${id}`, 'PATCH', data, null, token)
                return
            }

            await fetchData(`called/finishCalled/${id}`, 'PATCH', data, null, token)

        } catch (error) {

            console.log(error)

        } finally {
            setFinishModal(state => !state)
            getCalleds()
        }

    }

    const closeModal = () => {
        setFinishModal(state => !state)
        setIndevido(false)
    }

    useEffect(() => {
        const dataAtual = new Date()

        setValue('dataEncerramento', dataAtual);
        setValue('id_user_finalizacao', user?.id)

    }, [])

    useEffect(() => {

        if (indevido) {
            setValue('indevido', indevido)
            unregister("horaFimPippe")
            unregister("observacaoEncerramento")
        } else {
            unregister("indevido")
            unregister("observacaoIndevido")
        }

    }, [indevido])


    return (
        <div className={styles.background} >
            <div className={styles.modalFinish}>
                <h2>Finalizar Chamado</h2>
                <form onSubmit={handleSubmit(handleSubmitData)}>

                    <label>
                        <span>Data do Encerramento do chamado</span>
                        <input
                            id={styles.formatedInformations}
                            type="text"
                            disabled
                            value={dataAtualUser}
                        />
                    </label>

                    <label>
                        <span>Hora fim PIPPE</span>
                        <InputMask
                            placeholder='Insira a data de Finalização Pippe'
                            mask={'99/99/9999 - 99:99'}
                            disabled={indevido}
                            className={styles.input}
                            {...register('horaFimPippe')}
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
                        <span>Tempo total de Extravasamento</span>
                        <input id={styles.formatedInformations}
                            type="text"
                            disabled
                            value={finalDate}
                        />
                    </label>

                    <label>
                        <span>Observação de Encerramento</span>
                        <input
                            {...register('observacaoEncerramento')}
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
                                    <button className='btn_custom3' type='button' onClick={closeModal}>
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

export default ModalFinish