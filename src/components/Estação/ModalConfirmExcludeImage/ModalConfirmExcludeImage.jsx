import styles from './ModalConfirmExcludeImage.module.css'

// HOOKS
import { useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useApi } from '../../../hooks/useApi'

// COMPONENTS
import Loading from '../../Geral/Loading/Loading'

const ModalConfirmExcludeImage = ({ setOpenModal, setFile, allImages }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [searchParams] = useSearchParams()

    const data = {
        id_image: searchParams.get('id')
    }
    const { id } = useParams()

    const { fetchData, loading } = useApi()

    async function excludeImage() {
        try {
            await fetchData(`estacao/excludeImage/${id}`, 'DELETE', data, null, token)
        } catch (error) {
            console.log(error)
        } finally {
            setOpenModal(state => !state)
            const newList = allImages.filter(files => files.id != data.id_image)
            setFile(newList)
        }
    }
    return (
        <div className={styles.background}>

            <div className={styles.image_inform}>
                <div>
                    <i id={styles.icon} className='bi bi-exclamation-circle'></i>
                </div>
            </div>

            <div className={styles.container}>

                <p>Confirma a exclusão da imagem ? </p>
                <p>A imagem será excluida de forma permanente.</p>

                <div className={styles.button_container}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <button
                                className={styles.confirm_button}
                                onClick={() => excludeImage()}
                            >
                                Confirmar
                            </button>
                            <button
                                className={styles.cancel_button}
                                onClick={() => setOpenModal(state => !state)}
                            >
                                Cancelar
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ModalConfirmExcludeImage
