import styles from '../ModalInfo.module.css'

import { useState } from 'react'

const ItemChamadoEletromecanico = ({ data }) => {

    const [chamadoEletromecanico, setChamadoEletromecanico] = useState(false)

    return (
        <>
            <div className={styles.sections} onClick={() => setChamadoEletromecanico(state => !state)}>
                <h3 className={styles.textRender}>Registro Eletromecânico</h3>
                <i className={chamadoEletromecanico ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}></i>
            </div>

            {chamadoEletromecanico && (
                <section>
                    <fieldset>
                        <legend>Data Início</legend>
                        <p>{data.chamado_eletromecanico?.data_inicio}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Hora Início</legend>
                        <p>{data.chamado_eletromecanico?.hora_inicio}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Supervisão</legend>
                        <p>{data.chamado_eletromecanico?.supervisao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Instalação</legend>
                        <p>{data.chamado_eletromecanico?.instalacao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Descrição Serviço</legend>
                        <p>{data.chamado_eletromecanico?.descricao_servico}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Solicitação</legend>
                        <p>{data.chamado_eletromecanico?.solicitacao}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Nota MPM</legend>
                        <p>{data.chamado_eletromecanico?.nota_mpm}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Ordem de Serviço</legend>
                        <p>{data.chamado_eletromecanico?.ordem_servico}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Data Hora Fim</legend>
                        <p>{data.chamado_eletromecanico?.data_hora_fim}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Observação</legend>
                        <abbr title={data.observacao}>
                            <p>{data.chamado_eletromecanico?.observacao}</p>
                        </abbr>
                    </fieldset>

                    <fieldset>
                        <legend>Extravasamento</legend>
                        <p>{data.chamado_eletromecanico?.extravasamento === true ? 'Atingido' : 'Não Atingido'}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Sintomas</legend>
                        <p>{data.chamado_eletromecanico?.sintomas}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Descrição dos Sintomas</legend>
                        <p>{data.chamado_eletromecanico?.descricao_sintomas}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Criado Por</legend>
                        <p>{data.chamado_eletromecanico?.criado_por?.name}</p>
                    </fieldset>

                </section>
            )}
        </>
    )
}

export default ItemChamadoEletromecanico
