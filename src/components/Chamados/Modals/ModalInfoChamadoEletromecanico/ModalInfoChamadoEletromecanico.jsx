import styles from './ModalInfoChamadoEletromecanico.module.css'

import Loading from '../../../Geral/Loading/Loading'
import { useApi } from '../../../../hooks/useApi'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const ModalInfoChamadoEletromecanico = ({openModalInfo}) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { data, loading, fetchData } = useApi()

    const [searchParams] = useSearchParams()

    const id = searchParams.get('id')

    async function getData() {
        try {
            await fetchData(`chamadosEletromecanicos/searchCalled/${id}`, 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        return
    }, [])

    return (
        <div className={styles.background}>

            {loading && <Loading />}

            {!loading && (
                <div className={styles.modalInfo}>

                    <h2>Informações gerais do Chamado Eletromacânico</h2>

                    <div className={styles.container}>
                        
                    <fieldset>
                        <legend>Usuário Criação</legend>
                        <p>{data.criado_por?.name}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Data início</legend>
                        <p>{data.data_inicio}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Hora início</legend>
                        <p>{data.hora_inicio}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Supervisão</legend>
                        <p>{data.supervisao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Instalação</legend>
                        <p>{data.instalacao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Descrição do Serviço</legend>
                        <p>{data.descricao_servico}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Nota PM</legend>
                        <p>{data.nota_mpm}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Ordem de Serviço</legend>
                        <p>{data.ordem_servico}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Solicitante</legend>
                        <p>{data.solicitacao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Observação de Abertura</legend>
                        <p>{data.observacao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Sintomas</legend>
                        <p>{data.sintomas}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Descrição do Sintoma</legend>
                        <p>{data.descricao_sintomas}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Nível Extravasamento</legend>
                        <p>{data.extravasamento ? 'Atingido' : 'Não se Aplica / Não Atingido'}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Data Hora Fim</legend>
                        <p>{data.data_hora_fim}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Observação de encerramento</legend>
                        <p>{data.observacao_final}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Usuário Finalização</legend>
                        <p>{data.finalizado_por?.name}</p>
                    </fieldset>
                    

                    </div>

                    <button
                        id={styles.button}
                        className='btn_custom3'
                        onClick={() => openModalInfo(state => !state)}
                    >
                        <span>Fechar</span>
                    </button>

                </div>
            )}

        </div>
    )
}

export default ModalInfoChamadoEletromecanico
