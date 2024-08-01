import styles from '../ModalInfo.module.css'
import { useState } from 'react'

import { calcula_hora_com_data_final_dataJS } from '../../../../../utils/calculateHour'

const ItemEncerramento = ({ data }) => {

    const [completedCall, setCompletedCall] = useState(false)

    const data_encerramento_formatada = new Date(data.dataEncerramento).toLocaleString('pt-BR')

    return (
        <>
            <div className={styles.sections} onClick={() => setCompletedCall(state => !state)}>
                <h3 className={styles.textRender}>Dados Chamado Finalizado</h3>
                <i className={completedCall ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}></i>
            </div>

            {completedCall && (
                <>
                    <fieldset>
                        <legend>Operador Encerramento</legend>
                        <p>{data.finalizado_por?.name}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Hora fim PIPPE</legend>
                        <p>{data.horaFimPippe}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Tempo total do</legend>
                        <p>{`${calcula_hora_com_data_final_dataJS(data.createdAt, data.dataEncerramento)} 
                        ${calcula_hora_com_data_final_dataJS(data.createdAt, data.dataEncerramento) <= 1 ? 'Hora' : 'Horas'} `}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Data Encerramento Chamado</legend>
                        <p>{data_encerramento_formatada}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Obervação encerramento</legend>
                        <abbr title={data.observacaoEncerramento}>
                            <p>{data.observacaoEncerramento}</p>
                        </abbr>
                    </fieldset>
                </>
            )}
        </>
    )
}

export default ItemEncerramento
