import styles from './ConfirmToExcludUser.module.css'

// HOOKS
import { useSearchParams } from 'react-router-dom';
import { useApi } from '../../../../hooks/useApi';

// COMPONENTS
import Loading from '../../../Geral/Loading/Loading';

const ConfirmToExcludUser = ({ setOpenModal, getAllUsers }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [searchParams] = useSearchParams()
    const { fetchData, loading } = useApi()

    const idUser = searchParams.get('id')

    const nameUser = searchParams.get('name')

    async function excludeUser() {
        try {

            await fetchData(`auth/removeUser/${idUser}`, 'DELETE', null, null, token)

        } catch (error) {

            console.log(error)

        } finally {
            setOpenModal(state => !state)

            getAllUsers()
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

                <p>
                    Confirma a exclusão do usuário(a)
                    <span className={styles.name_user}>
                        {nameUser}</span>?
                </p>
                <p>O usuário será excluido de forma permanente.</p>

                <div className={styles.button_container}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <button
                                className={styles.confirm_button}
                                onClick={() => excludeUser()}
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

export default ConfirmToExcludUser
