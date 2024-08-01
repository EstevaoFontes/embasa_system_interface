import styles from './EstacaoElevatoria.module.css';

import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../../hooks/useApi';

import ElevatoriaImages from '../ElevatoriaImages/ElevatoriaImages'

const EstacaoElevatoria = ({ data }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { fetchData } = useApi()

    async function handleDelete() {
        // try {
        //     await fetchData(`estacao/deleteEEE/${data.id}`, 'DELETE', null, null, token)
        // } catch (error) {
        //     console.log(error)
        // }
        return
    }

    const {
        nome_estacao,
        endereco,
        area_manutencao,
        unidade_regional,
        nome_monitor,
        imagens,
        updatedAt
    } = data

    const dataFormatada = new Date(updatedAt).toLocaleDateString()

    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <ElevatoriaImages images={imagens} />

            <div className={styles.container_image_informations}>
                <div className={styles.information}>
                    <span className={styles.name}>{nome_estacao}</span>
                    <p>{endereco}</p>

                    <div className={styles.details}>
                        <span>{area_manutencao}</span>
                        <span>{unidade_regional}</span>
                        <span>{nome_monitor}</span>
                    </div>
                </div>

                <div className={styles.button}>
                    <abbr title="Editar Dados da Estação">
                        <button
                            className={styles.button_edit}
                            onClick={() => navigate(`/eee/eeeEdit/${data.id}`)}
                        >
                            <i className="bi bi-pencil-fill"></i>
                            <span>Editar</span>
                        </button>
                    </abbr>

                    <abbr title="Gerar PDF">
                        <button
                            className={styles.button_file}
                            onClick={() => navigate(`/eee/pdfeee/${data.id}`)}
                        >
                            <i className='bi bi-filetype-pdf'></i>
                            <span>PDF</span>
                        </button>
                    </abbr>

                    <abbr title="Ver Localização no Mapa">
                        <button className={styles.button_map} onClick={() => handleDelete()} disabled >
                            <i className="bi bi-google"></i>
                            <span>Excluir</span>
                        </button>
                    </abbr>
                </div>

                <div className={styles.atualizadoEm}>
                    <span>Ultima atualização em:</span>
                    <span>{dataFormatada}</span>
                </div>

            </div>

        </div>

    )
}

export default EstacaoElevatoria