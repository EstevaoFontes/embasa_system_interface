import styles from './ComponenHistoric.module.css'

const InformationsHistoric = ({ data, user_name, date, title, informatioHistoric, colorStyle, isEdit = false, key}) => {

    const data_formatada = new Date(date).toLocaleString()

    const transformacao_data_campo_para_string_formatada = {
        unidades: 'Unidade',
        ordemServico: 'Ordem de Serviço',
        informadoPor: 'Informado Por',
        motivo: 'Motivo',
        extravasando: 'Nível de Extravasamento ',
        horaInicioPippe: 'Hora Início Pippe',
        protocoloCoelba: 'Protocolo Coelba',
        observacaoAbertura: 'Observação de Abertura',
        notaPM: 'Nota PM'
    }

    return (
        <div className={styles.informations_historic}>

            <div className={styles.icon_name}>

                <i className='bi bi-person-circle'></i>

                <span>{user_name}</span>

                <span
                    className={styles.informatioHistoric}
                    style={{ color: colorStyle }}
                >
                    ({informatioHistoric})
                </span>

            </div>

            <div className={styles.title}>

                {!isEdit && <span>{title}</span>}

                {isEdit && (
                    <div className={styles.isEdit}>

                        <span>{`${transformacao_data_campo_para_string_formatada[data.campo]}:`}</span>

                        {data.valor_antigo && (
                            <span
                                style={{ color: 'red' }}
                                className={styles.valores}
                            >
                                <i className='bi bi-arrow-left'  style={{marginRight: '.5em'}}></i>

                                {data.valor_antigo == 'true' && 'Atingido'}
                                {data.valor_antigo == 'false' && 'Não Atingido/ Não se aplica'}
                                {(data.valor_antigo !== 'true' && data.valor_antigo !== 'false') && data.valor_antigo}

                            </span>
                        )}

                        {(!data.valor_antigo && data.campo !== 'unidades') && (
                            <span
                                style={{ color: 'grey' }}
                                className={styles.valores}
                            >
                                (Campo Vazio!)
                            </span>
                        )}

                        {data.valor_novo && (
                            <span
                                style={{ color: 'green' }}
                                className={styles.valores}
                            >
                                <i className='bi bi-arrow-right' style={{marginRight: '.5em'}}></i>

                                {data.valor_novo == 'true' && 'Atingido'}
                                {data.valor_novo == 'false' && 'Não Atingido/ Não se aplica'}
                                {data.valor_novo !== 'true' && data.valor_novo !== 'false' && data.valor_novo}
                                
                            </span>
                        )}

                        {(!data.valor_novo && data.campo !== 'unidades') && (
                            <span
                                style={{ color: 'grey' }}
                                className={styles.valores}
                            >
                                (Campo Vazio!)
                            </span>
                        )}

                        {data.antiga_estacao?.nome_estacao &&
                            <span
                                style={{ color: 'red' }}
                                className={styles.valores}
                            >
                                <i className='bi bi-arrow-left'  style={{marginRight: '.5em'}}></i>
                                {data.antiga_estacao?.nome_estacao}
                            </span>
                        }

                        {data.nova_estacao?.nome_estacao &&
                            <span
                                style={{ color: 'green' }}
                                className={styles.valores}
                            >
                                 <i className='bi bi-arrow-right' style={{marginRight: '.5em'}}></i>
                                {data.nova_estacao?.nome_estacao}
                            </span>
                        }

                    </div>
                )}
            </div>

            <span className={styles.date}>{data_formatada}</span>
        </div>
    )
}

export default InformationsHistoric 
