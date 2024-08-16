import styles from './OnCalled.module.css'
// HOOKS
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// CONTEXT
import { useAuth } from '../../../context/AuthProvider'
// UTIL
import { calcula_hora_hoje, calcula_hora_com_data_final_dataJS } from '../../../utils/calculateHour';
// COMPONENTS
import Flags from '../../Geral/Flags/Flags';
import VisualStatus from '../../Geral/VisualStatus/VisualStatus';

const OnCalled = ({ data, setModalHistoric, setModalFinish, setInfoModal }) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [hoursCalculated, setHoursCalculated] = useState()

    const { user, permissions } = useAuth()

    const navigate = useNavigate()

    const date = new Date(data.createdAt).toLocaleString('pt-BR')

    const id = data?.id

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
        } else {
            const data_total_calculada = calcula_hora_com_data_final_dataJS(data.createdAt, data.dataEncerramento)
            setHoursCalculated(data_total_calculada)
        }
    }, [data])

    return (
        <>
            <tr>
                <td className={data.indevido ? styles.td_indevido : ""} style={{ position: 'relative' }}>
                    <div className={styles.container}>

                        {analise_divergencias_extravasamento() && (
                            <Flags
                                color={'red'}
                                position_horizontal={'right'}
                                position_vertical={'top'}
                                text={'Divergências nos dados de extravasamento.'}
                            />
                        )}

                        {data.chamado_eletromecanico?.isActive == false && (
                            <Flags
                                color={'blue'}
                                position_horizontal={'left'}
                                position_vertical={'top'}
                                text={'A Eletromecânica finalizou o chamado!'}
                            />
                        )}

                        {data.chamado_noturno && !data.notaPM && (
                            <Flags
                                color={'purple'}
                                position_horizontal={'left'}
                                position_vertical={'bottom'}
                                text={'Sinalizado como Chamado Noturno!'}
                                text2={'Favor colocar informação de Nota PM!'}
                            />
                        )}

                        {(data.isActive && data.extravasando) && (
                            <VisualStatus color={'red'} legenda={'Urgente'} />
                        )}

                        {(data.isActive && !data.extravasando) && (
                            <VisualStatus color={'yellow'} legenda={'Estável'} />
                        )}

                        {(!data.isActive && !data.indevido) && (
                            <VisualStatus color={'grey'} legenda={'Finalizado'} />
                        )}

                        {(!data.isActive && data.indevido) && (
                            <VisualStatus color={'#ccc'} legenda={'Indevido'} />
                        )}

                    </div>
                </td>

                <td className={data.indevido ? styles.td_indevido : ""}>{data.notaPM}</td>

                <td className={data.indevido ? styles.td_indevido : ""}>{data.criado_por?.name}</td>

                <td className={data.indevido ? styles.td_indevido : ""}>{date}</td>

                <td className={data.indevido ? styles.td_indevido : ""}>{data.estacao?.nome_estacao}</td>

                <td className={data.indevido ? styles.td_indevido : ""}>{data.motivo}</td>

                <td className={data.indevido ? styles.td_indevido : ""}>{data.extravasando ? 'Atingido' : 'Não Atingido/ Não se aplica'}</td>

                <td className={data.indevido ? styles.td_indevido : ""}>
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

                        <li>
                            < button onClick={() => handleOpenModal(setModalHistoric)}>
                                <span>Histórico</span>
                            </button >
                        </li>

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