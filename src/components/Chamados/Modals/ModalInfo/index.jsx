import styles from './ModalInfo.module.css'

// HOOK
import { useSearchParams } from 'react-router-dom';
import { useApi } from '../../../../hooks/useApi';
import { useEffect } from 'react';

// COMPONENTS
import Loading from '../../../Geral/Loading/Loading';
import ItemChamadoPrincipal from './Items/ItemChamadoPrincipal';
import ItemAtualizacoes from './Items/ItemAtualizacoes';
import ItemChamadoEletromecanico from './Items/ItemChamadoEletromecanico';
import ItemEncerramento from './Items/ItemEncerramento';
import ItemIndevido from './Items/ItemIndevido'

const ModalInfo = ({ setInfoModal }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { data, loading, fetchData } = useApi()

    const [searchParams] = useSearchParams()

    const id = searchParams.get('id')

    async function getData() {
        try {
            await fetchData(`called/getUniqueCall/${id}`, 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        return
    }, [])


    return (
        <div className={styles.background}>

            {loading && <Loading />}

            {!loading && (
                <div className={styles.modalInfo}>

                    <h2>Informações gerais do Chamado</h2>

                    <div className={styles.container}>


                        <ItemChamadoPrincipal data={data} />

                        {(data.atualizacoes && data.atualizacoes.length > 0) && (
                            <ItemAtualizacoes data={data}/>
                        )}

                        {(data.chamado_eletromecanico) && (
                            <ItemChamadoEletromecanico data={data} />
                        )}

                        {data.isActive === false && (
                            <ItemEncerramento data={data}/>
                        )}

                        {data.indevido === true && (
                            <ItemIndevido data={data}/>
                        )}

                    </div>

                    <button
                        id={styles.button}
                        className='btn_custom3'
                        onClick={() => setInfoModal(state => !state)}
                    >
                        <span>Fechar</span>
                    </button>

                </div>
            )}

        </div>
    )
}

export default ModalInfo

