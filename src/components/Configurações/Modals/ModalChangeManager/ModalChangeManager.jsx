import styles from './ModalChangeManager.module.css'

const ModalChangeManager = ({ setOpenModalChangeManager }) => {

    return (
        <div className={styles.background}>

            <div className={styles.image_inform}>
                <div>
                    <i className='bi bi-exclamation-triangle'></i>
                </div>
            </div>

            <div className={styles.container}>
                <h2>Atenção!</h2>
                <p>Ao trocar o usuário para a função de Gerente,
                    posteriormente não poderá ser
                    trocado sua função ou ser excluido! </p>
                <button
                    className={styles.button_confirm}
                    onClick={() => setOpenModalChangeManager(state => !state)}
                >
                    Entendi !
                </button>
            </div>

        </div >
    )
}

export default ModalChangeManager
