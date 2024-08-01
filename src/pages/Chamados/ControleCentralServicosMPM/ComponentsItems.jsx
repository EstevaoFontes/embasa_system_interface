import styles from './ControleCentralServicosMPM.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

const ComponentsItems = ({ registro, modalEditar, modalExcluir, modalFinalzar }) => {

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

    function verificar_data_final() {
        if (registro.data_hora_fim.length > 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <tr className={styles.items_components}>

            <td >
                <div className={styles.status}>
                    <span style={{ display: 'none' }}>
                        {verificar_data_final() ? 'Finalizado' : 'Pendente'}
                    </span>
                    <div className={verificar_data_final() ? styles.normal : styles.urgent}></div>
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

                {user.funcao === 'Visitante' || registro.isActive === false ? (
                    <i className="bi bi-ban" style={{ cursor: 'not-allowed' }}></i>
                ) : (
                    <>
                        <i id={styles.dropdown} className={'bi bi-three-dots-vertical'}></i>

                        <ul className={styles.options}>

                            <li>
                                <button onClick={() => handleOpenModalEditar()}>
                                    <span>Editar</span>
                                </button >
                            </li>

                            <li>
                                <button onClick={() => handleOpenModalFinalizar()}>
                                    <span>Finalizar</span>
                                </button>
                            </li>

                            <li>
                                <button onClick={() => excluirLinha()}>
                                    <span>Excluir</span>
                                </button >
                            </li>

                        </ul>
                    </>
                )}

            </td>


        </tr>
    )
}

export default ComponentsItems
