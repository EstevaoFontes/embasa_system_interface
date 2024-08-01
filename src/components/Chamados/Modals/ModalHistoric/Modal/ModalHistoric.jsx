import styles from './ModalHistoric.module.css';
// COMPONENTS
import InformationsHistoric from '../InfomationHistoric/InformationsHistoric';
import Loading from '../../../../Geral/Loading/Loading';
// HOOKS
import { useApi } from '../../../../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const ModalHistoric = ({ setModalHistoric }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { data, loading, fetchData } = useApi()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')

    const dataStartFormated = new Date(data.createdAt).toLocaleString('pt-BR')
    const dataEndFormated = !data.isActive && new Date(data.dataEncerramento).toLocaleString('pt-BR')

    async function getDataHistoric() {
        await fetchData(`called/getUniqueCall/${id}`, 'GET', null, null, token)
    }

    useEffect(() => {
        getDataHistoric()
        return
    }, [])

    return (
        <div className={styles.background} >
            {loading ? (
                <Loading />
            ) :
                (
                    <div className={styles.modalHistoric}>
                        <button className={styles.close} onClick={() => setModalHistoric(state => !state)}>
                            <i className='bi bi-x-circle'></i>
                        </button>
                        <h1>Histórico</h1>
                        <div className={styles.historic}>

                            <InformationsHistoric
                                createdBy={data.User?.name}
                                data={dataStartFormated}
                                title={'Chamado Criado'}
                                informatioHistoric={'Criação'}
                                style={'blue'}
                            />

                            {data.atualizacoes && data.atualizacoes.map((att, index) => (
                                <InformationsHistoric
                                    key={index}
                                    createdBy={att.createBy}
                                    data={att.data}
                                    title={att.title}
                                    informatioHistoric={'Atualização'}
                                    style={'green'}
                                />
                            ))}

                            {(data.isActive === false && data.indevido === false) && (
                                <InformationsHistoric
                                    createdBy={data.usuarioFinalizacao}
                                    data={dataEndFormated}
                                    title={data.observacaoEncerramento}
                                    informatioHistoric={'Finalização'}
                                    style={'blue'}
                                />
                            )}

                            {(data.indevido === true) && (
                                <InformationsHistoric
                                    createdBy={data.usuarioFinalizacao}
                                    data={dataEndFormated}
                                    title={data.observacaoIndevido}
                                    informatioHistoric={'Indevido'}
                                    style={'red'}
                                />
                            )}

                        </div>
                    </div>
                )}
        </div>
    )
}

export default ModalHistoric
