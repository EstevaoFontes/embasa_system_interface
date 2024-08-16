import styles from './ModalHistoric.module.css';
// COMPONENTS
import ComponenHistoric from './componentHistoric/ComponenHistoric';
import Loading from '../../../Geral/Loading/Loading';
// HOOKS
import { useApi } from '../../../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const ModalHistoric = ({ setModalHistoric }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { data, loading, fetchData } = useApi()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')

    async function getDataHistoric() {
        try {
            await fetchData(`called/obterDadosEdicoes/${id}`, 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataHistoric()
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

                            {data.chamados &&
                                <ComponenHistoric
                                    data={data.chamados}
                                    user_name={data.chamados?.criado_por?.name}
                                    date={data.chamados?.createdAt}
                                    informatioHistoric={'Criação'}
                                    colorStyle={'blue'}
                                    title={'Chamado criado'}
                                />}

                            {data.chamados?.atualizacoes && data.chamados?.atualizacoes.map((att, index) => (
                                <ComponenHistoric
                                    key={index}
                                    user_name={att.criado_por}
                                    date={att.createdAt}
                                    data={att}
                                    title={att.title}
                                    informatioHistoric={'Atualização'}
                                    colorStyle={'green'}
                                />
                            ))}

                            {data?.registros?.map(edit => (
                                <ComponenHistoric
                                    key={edit.id}
                                    data={edit}
                                    date={edit.createdAt}
                                    user_name={edit.editado_por?.name}
                                    informatioHistoric={'Edição'}
                                    colorStyle={'purple'}
                                    isEdit
                                />
                            ))}

                            {(data.chamados?.isActive === false && data.chamados?.indevido === false) && (
                                <ComponenHistoric
                                    user_name={data.chamados?.finalizado_por.name}
                                    date={data.chamados?.dataEncerramento}
                                    title={data.chamados?.observacaoEncerramento}
                                    informatioHistoric={'Finalização'}
                                    colorStyle={'blue'}
                                />
                            )}

                            {(data.chamados?.indevido === true) && (
                                <ComponenHistoric
                                    user_name={data.chamados?.finalizado_por.name}
                                    date={data.chamados?.dataEncerramento}
                                    title={data.chamados?.observacaoIndevido}
                                    informatioHistoric={'Indevido'}
                                    colorStyle={'red'}
                                />
                            )}

                        </div>
                    </div>
                )}
        </div>
    )
}

export default ModalHistoric
