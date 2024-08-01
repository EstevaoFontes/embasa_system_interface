import styles from './EEE.module.css';

// HOOKS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi'

// COMPONENTS
import Loading from '../../../components/Geral/Loading/Loading'
import EstacaoElevatoria from '../../../components/Estação/EstacaoElevatoria/EstacaoElevatoriaComponent/EstacaoElevatoria';

// CONTEXT
import { useAuth } from '../../../context/AuthProvider';


const EEE = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()

    const { user, permissions } = useAuth()

    const [search, setSearch] = useState("")

    const { data, loading, fetchData } = useApi()


    async function getSearchedEstacoes() {
        try {
            await fetchData(`estacao/searchEEE?nome_estacao=${search}`, 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    function handleKey(e) {
        if (e.key === 'Enter') {
            getSearchedEstacoes()
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input
                    type='search'
                    placeholder='Pesquise por uma Estação Elevatória'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    onKeyDown={(e) => handleKey(e)}
                />
                <button
                    className={styles.button_search}
                    onClick={() => getSearchedEstacoes()}
                >
                    <i className='bi bi-search'></i>
                </button>
            </div>

            {
                permissions.nova_estacao.includes(user.funcao) && (
                    <>
                        <button
                            className='btn_custom2'
                            id={styles.nova_estacao}
                            onClick={() => navigate('/eee/newEEE')}
                        >
                            Criar uma Nova Estação
                        </button>
                    </>
                )
            }

            {loading && (
                <Loading />
            )}

            {data.map((estacao, index) => (
                <EstacaoElevatoria
                    key={index}
                    data={estacao}
                />
            ))}
        </div>
    )
};

export default EEE;