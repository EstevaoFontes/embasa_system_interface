import styles from './Chamados.module.css';

// COMPONENTES
import OnCalled from '../../../components/Chamados/OnCalled/OnCalled';
import Loading from '../../../components/Geral/Loading/Loading';
import ModalInfo from '../../../components/Chamados/Modals/ModalInfo/index'
import ModalFinish from '../../../components/Chamados/Modals/ModalFinish/ModalFinish';
import ModalHistoric from '../../../components/Chamados/Modals/ModalHistoric/Modal/ModalHistoric';

// HOOKS
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

const Chamados = () => {
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('token'))

    const [search, setSearch] = useState("")
    const [filterChosen, setFilterChosen] = useState('')
    const [showSideBar, setShowSideBar] = useState(false)

    const { loading, data, fetchData } = useApi()
    const { user, permissions } = useAuth()

    const [modalInfo, setInfoModal] = useState(false)
    const [modalFinish, setModalFinish] = useState(false)
    const [modalHistoric, setModalHistoric] = useState(false)

    const filteredCalls = search.length > 0 && data.filter(call => {
        if (filterChosen.length > 0) {
            if (filterChosen === 'unidade') {
                return call.estacao?.nome_estacao.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            }

            if (filterChosen === 'operador') {
                return call.estacao?.nome_estacao.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            }

            return call[filterChosen].toLocaleLowerCase().includes(search.toLocaleLowerCase())


        } else {
            setSearch("")
            return
        }
    });

    const completedCalls = async () => {
        try {
            await fetchData('called/completedCalls', 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    async function getCalleds() {
        try {
            await fetchData('called/allCalled', 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    function ordenar_chamado(data) {
        if (data.pippe === true) return 1
        if (data.pippe === false) return -1
        return
    }

    const lista_ordenada_status = data.slice().sort(ordenar_chamado)
    const lista_reversa_status = lista_ordenada_status.slice().reverse()

    const ordenarPorDataCriacao = (a, b) => {
        const dataA = new Date(a.createdAt);
        const dataB = new Date(b.createdAt);
        return dataB - dataA;
    };

    const lista_ordenada_data = data.slice().sort(ordenarPorDataCriacao)
    const lista_reversa_data = lista_ordenada_data.slice().reverse()

    const dados = [data, lista_ordenada_status, lista_reversa_status, lista_ordenada_data, lista_reversa_data]
    const [indiceDados, setIndiceDados] = useState(0)

    function ornedar_status() {

        if (indiceDados > 2) {
            setIndiceDados(1)
            return
        }

        if (indiceDados === 2) {
            setIndiceDados(0)
            return
        }
        setIndiceDados(state => state + 1)
    }

    function ordenar_data() {
        if (indiceDados >= 4) {
            setIndiceDados(0)
            return
        }
        if (indiceDados === 3) {
            setIndiceDados(state => state + 1)
            return
        }
        setIndiceDados(3)
    }

    useEffect(() => {
        getCalleds()
        return
    }, [])

    return (
        <main className={styles.container}>

            <aside className={showSideBar ? styles.side_bar : styles.side_bar_none}>
                <ul>
                    <li onClick={() => getCalleds()}>
                        <span>Chamados Ativos</span>
                    </li>
                    <li onClick={() => completedCalls()} >
                        <span>Chamados Finalizados</span>
                    </li>

                    <li
                        className={styles.container_realtorio_agersa}
                        onClick={() => navigate('./pdfCall')}
                    >
                        <span>Relatório Agersa</span>
                        <i id={styles.caret_ralatorio_agersa}></i>
                    </li>
                </ul>
            </aside>

            <button
                onClick={() => setShowSideBar(state => !state)}
                className={showSideBar ? styles.close_side_bar : styles.show_side_bar}
                id={styles.float_button_sidebar}
            >
                <i className={showSideBar ? 'bi bi-x' : 'bi bi-list'}></i>
            </button>

            <div className={styles.actions}>

                <button
                    id={styles.button_new_called}
                    className='btn_custom2'
                    onClick={() => navigate('./newCalled')}
                >
                    <span>Novo chamado</span>
                </button>

                <select onChange={(e) => setFilterChosen(e.target.value)}>
                    <option value=''>Sem filtro</option>
                    {/* melhorar lógica para buscar o operador que é agora é uma chave extrangeira */}
                    <option value="operador">Operador</option>
                    <option value="unidade">Unidade</option>
                    <option value="motivo">Motivo</option>
                    <option value="notaPM">Nota PM</option>
                </select>

                <i
                    className='bi bi-arrow-left'
                    id={filterChosen.length > 0 ? styles.arrow_active : styles.arrow_inactive}
                >
                </i>

                <input
                    type="search"
                    disabled={filterChosen.length === 0}
                    placeholder='Digite para filtrar.'
                    onChange={(e) => setSearch(e.target.value)}
                />

                <abbr title="Atualizar">
                    <button id={styles.atualization_page} onClick={() => getCalleds()}>
                        <i className='bi bi-arrow-clockwise'></i>
                    </button>
                </abbr>

                <button className={styles.botao_planilha} onClick={() => navigate('/planilha')}>
                    <span>Registros PPCM</span>
                </button>

            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => ornedar_status()}>
                            <div className={styles.data_filtro}>
                                <span >Status</span>
                                {indiceDados !== 1 && indiceDados !== 2 && <i className="bi bi-chevron-expand"></i>}
                                {indiceDados === 1 && <i className="bi bi-chevron-up"></i>}
                                {indiceDados === 2 && <i className="bi bi-chevron-down"></i>}
                            </div>
                        </th>
                        <th>Nota PM</th>
                        <th>Operador (Sala de controle)</th>
                        <th onClick={() => ordenar_data()}>
                            <div className={styles.data_filtro}>
                                <span>Data de abertura</span>
                                {indiceDados < 3 && <i className="bi bi-chevron-expand"></i>}
                                {indiceDados === 3 && <i className="bi bi-chevron-up"></i>}
                                {indiceDados === 4 && <i className="bi bi-chevron-down"></i>}
                            </div>
                        </th>
                        <th>Unidade</th>
                        <th>Motivo</th>
                        <th>Nível de Extravasamento</th>
                        <th>Tempo do Chamado</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {search.length > 0 ? (
                        filteredCalls.map((call) => (
                            <OnCalled
                                data={call}
                                key={call.id}
                                setInfoModal={setInfoModal}
                                setModalFinish={setModalFinish}
                                setModalHistoric={setModalHistoric}
                            />
                        ))
                    ) : (
                        dados[indiceDados].map((call) => (
                            <OnCalled
                                data={call}
                                key={call.id}
                                setInfoModal={setInfoModal}
                                setModalFinish={setModalFinish}
                                setModalHistoric={setModalHistoric}
                            />
                        ))
                    )}
                </tbody>

            </table>

            {loading && <div className={styles.loading}> < Loading /></div>}

            {!loading && data.length === 0 && <h3 className={styles.message_empty}> &lt; Nenhum Chamado encontrado... /&gt;</h3>}

            {modalInfo && <ModalInfo setInfoModal={setInfoModal} />}

            {modalFinish && <ModalFinish setFinishModal={setModalFinish} getCalleds={getCalleds} />}

            {modalHistoric && <ModalHistoric setModalHistoric={setModalHistoric} />}

        </main >
    )
};

export default Chamados 