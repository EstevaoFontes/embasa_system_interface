import styles from './ControleCentralServicosMPM.module.css';
// HOOKS
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
// COMPONENTS
import VisualStatus from '../../../components/Geral/VisualStatus/VisualStatus';

const ComponentsItems = ({ registro, modalEditar, modalExcluir, modalFinalzar, modalInfo }) => {

    const { user, permissions } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams()

    async function excluirLinha() {
        setSearchParams({ 'id': registro.id, 'nota_mpm': registro.nota_mpm })
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

                    {registro.isActive && (
                        <VisualStatus color={'rgb(217, 217, 16)'} legenda={'Em Tratativa'} />
                    )}

                    {(!registro.isActive && !registro.indevido) && (
                        <VisualStatus color={'rgb(84, 221, 5)'} legenda={'Finalizado'} />
                    )}

                    {(!registro.isActive && registro.indevido) && (
                        <VisualStatus color={'#ccc'} legenda={'Indevido'} />
                    )}
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

                        <li>
                            <button onClick={() => handleOpenModalInfo()}>
                                <span>Informações</span>
                            </button >
                        </li>

                        {(permissions.area_manutencao_called.includes(user.funcao) && registro.isActive) && (
                            <>
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
                            </>
                        )}
                    </ul>
                </>
            </td >


        </tr >
    )
}

export default ComponentsItems
