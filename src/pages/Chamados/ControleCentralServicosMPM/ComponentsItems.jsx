import styles from './ControleCentralServicosMPM.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

const ComponentsItems = ({ registro, modalEditar, modalExcluir, modalFinalzar, modalInfo }) => {

    const { user } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams()

    async function excluirLinha() {
        setSearchParams({ 'id': registro.id, 'os': registro.ordem_servico })
        modalExcluir(state => !state)
    }

    function handleOpenModalEditar() {
        setSearchParams({ 'id': registro.id })
        modalEditar(state => !state)
    }


    function handleOpenModalFinalizar() {
        setSearchParams({ 'id': registro.id })
        modalFinalzar(state => !state)
    }

    function handleOpenModalInfo() {
        setSearchParams({ 'id': registro.id })
        modalInfo(state => !state)
    }

    return (
        <tr className={styles.items_components} id={registro.indevido && styles.indevido}>

            <td >
                <div className={styles.status}>
                    <span style={{ display: 'none' }}>
                        {registro.isActive ? 'Finalizado' : 'Pendente'}
                        {registro.isActive == false && registro.indevido && 'Indevido'}
                    </span>
                    <div className={registro.isActive && styles.urgent}></div>
                    <div className={!registro.isActive && !registro.indevido && styles.normal}></div>
                    <div className={!registro.isActive && registro.indevido && styles.indevido_status}></div>
                </div>
            </td>

            <td>{registro.data_inicio}</td>
            <td>{registro.hora_inicio}</td>
            <td>{registro.supervisao}</td>
            <td>{registro.instalacao}</td>
            <td>{registro.descricao_servico}</td>
            <td>{registro.nota_mpm}</td>
            <td>{registro.ordem_servico}</td>
            <td>{registro.solicitacao}</td>
            <td>{registro.data_hora_fim}</td>
            <td>{registro.observacao}</td>

            <td id={styles.dropdown_active}>

                <>
                    <i id={styles.dropdown} className={'bi bi-three-dots-vertical'}></i>

                    <ul className={styles.options}>

                        {user.funcao === 'Visitante' || registro.isActive === false ? (
                            <></>
                        ) : (
                            <li>
                                <button onClick={() => handleOpenModalEditar()}>
                                    <span>Editar</span>
                                </button >
                            </li>
                        )}

                        <li>
                            <button onClick={() => handleOpenModalInfo()}>
                                <span>Informações</span>
                            </button >
                        </li>

                        {user.funcao === 'Visitante' || registro.isActive === false ? (
                            <></>
                        ) : (
                            <li>
                                <button onClick={() => handleOpenModalFinalizar()}>
                                    <span>Finalizar</span>
                                </button>
                            </li>
                        )}

                        {user.funcao === 'Visitante' || registro.isActive === false ? (
                            <></>
                        ) : (
                            <li>
                                <button onClick={() => excluirLinha()}>
                                    <span>Excluir</span>
                                </button >
                            </li>
                        )}


                    </ul>
                </>
            </td >


        </tr >
    )
}

export default ComponentsItems
