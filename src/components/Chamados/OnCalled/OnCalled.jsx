import styles from './OnCalled.module.css'
// HOOKS
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// CONTEXT
import { useAuth } from '../../../context/AuthProvider'
// UTIL
import { calcula_hora_hoje, calcula_hora_com_data_final_dataJS } from '../../../utils/calculateHour';

const OnCalled = ({ data, setModalHistoric, setModalFinish, setInfoModal }) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [hoursCalculated, setHoursCalculated] = useState()

    const [showDescriptionExtravasando, setShowDescriptionExtravasando] = useState(false)
    const [showDescriptionMotivos, setShowDescriptionMotivos] = useState(false)
    const [showDescriptionFinalizado, setShowDescriptionFinalizado] = useState(false)
    const [showDescriptionChamadoNoturno, setShowDescriptionChamadoNoturno] = useState(false)

    const { user, permissions } = useAuth()

    const navigate = useNavigate()

    const date = new Date(data.createdAt).toLocaleString('pt-BR')

    const id = data.id ? data.id : null

    function analise_divergencias_extravasamento() {

        if (data.chamado_eletromecanico?.extravasamento == undefined) {
            return
        }

        if (data.extravasando !== data.chamado_eletromecanico?.extravasamento) {
            return true
        }

        return false
    }

    //criação de função em andamento 
    // function analise_divergencias_motivos() {
    //     console.log('olá mundo')
    // }

    function handleOpenModal(modal) {
        setSearchParams({ 'id': id, 'hour': hoursCalculated })
        modal(state => !state)
    }

    useEffect(() => {
        setTimeout(() => {
            setHoursCalculated(calcula_hora_hoje(data.createdAt))
        }, 1000 * 60 * 30);
    }, [hoursCalculated])


    useEffect(() => {
        if (data.isActive) {
            const hora_calculada = calcula_hora_hoje(data.createdAt)
            setHoursCalculated(hora_calculada)
        }

        if (!data.isActive) {
            const data_total_calculada = calcula_hora_com_data_final_dataJS(data.createdAt, data.dataEncerramento)
            setHoursCalculated(data_total_calculada)
        }
    }, [])

    return (
        <>
            <tr>
                <td className={data.indevido ? styles.td_indevido : ""} style={{ position: 'relative' }}>
                    <div className={styles.container}>

                        {analise_divergencias_extravasamento() && (
                            <>
                                <i
                                    className='bi bi-flag-fill'
                                    id={styles.flag_extravasando}
                                    onMouseEnter={() => setShowDescriptionExtravasando(true)}
                                    onMouseLeave={() => setShowDescriptionExtravasando(false)}
                                >
                                    <div
                                        className={showDescriptionExtravasando ? styles.flag_information_show : styles.flag_information_none}
                                    >
                                        <p>Divergências nos dados de extravasamento</p>
                                    </div>
                                </i>
                            </>
                        )}

                        {data.chamado_eletromecanico?.isActive == false && (
                            <>
                                <i
                                    className='bi bi-flag-fill'
                                    id={styles.flag_finalizacao}
                                    onMouseEnter={() => setShowDescriptionFinalizado(true)}
                                    onMouseLeave={() => setShowDescriptionFinalizado(false)}
                                >
                                    <div
                                        className={showDescriptionFinalizado ? styles.flag_information_show : styles.flag_information_none}
                                    >
                                        <p>A Eletromecânica finalizou o chamado!</p>
                                    </div>
                                </i>
                            </>
                        )}

                        {data.chamado_noturno && !data.notaPM && (
                            <>
                                <i
                                    className='bi bi-flag-fill'
                                    id={styles.flag_chamado_noturno}
                                    onMouseEnter={() => setShowDescriptionChamadoNoturno(true)}
                                    onMouseLeave={() => setShowDescriptionChamadoNoturno(false)}
                                >
                                    <div
                                        className={showDescriptionChamadoNoturno ? styles.flag_information_show : styles.flag_information_none}
                                    >
                                        <p>Sinalizado como Chamado Noturno.!</p>
                                        <p>Favor colocar informação de Nota PM!</p>
                                    </div>
                                </i>
                            </>
                        )}

                        {data.isActive && (
                            <abbr title={data.extravasando === true ? 'Urgente' : 'Estável'}>
                                <div className={data.extravasando === true ? styles.urgent : styles.normal}></div>
                            </abbr>
                        )}

                        {!data.isActive && (
                            <abbr title={data.indevido ? 'Indevido' : 'Finalizado'}>
                                <div className={data.indevido ? styles.indevido : styles.completed}></div>
                            </abbr>
                        )}

                    </div>
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {data.notaPM}
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {data.criado_por?.name}
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {date}
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {data.estacao?.nome_estacao}
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {data.motivo}
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {data.extravasando === true ? 'Atingido' : 'Não Atingido'}
                </td>

                <td
                    className={data.indevido ? styles.td_indevido : ""}
                >
                    {`${hoursCalculated} ${hoursCalculated > 1 ? 'horas' : 'hora '}`}
                </td>

                <td id={styles.dropdown_active} className={data.indevido ? styles.td_indevido : ""}>
                    <i id={styles.dropdown} className={'bi bi-three-dots-vertical'}></i>

                    <ul className={styles.options}>
                        <li>
                            < button onClick={() => handleOpenModal(setInfoModal)}>
                                <span>Informações</span>
                            </button >
                        </li>
                        {/* <li>
                            < button onClick={() => handleOpenModal(setModalHistoric)}>
                                <span>Histórico</span>
                            </button >
                        </li> */}

                        {
                            data?.isActive && (
                                permissions.called_finish.includes(user?.funcao) && (
                                    <li>
                                        <button onClick={() => navigate(`/calledEdit/${data.id}`)}>
                                            <span>Editar</span>
                                        </button>
                                    </li>
                                )
                            )
                        }

                        {
                            data?.isActive && (
                                permissions.called_finish.includes(user?.funcao) && (
                                    <li>
                                        <button onClick={() => handleOpenModal(setModalFinish)}>
                                            <span>Finalizar</span>
                                        </button>
                                    </li>
                                )
                            )
                        }

                    </ul>
                </td>
            </tr>
        </>

    )
};

export default OnCalled