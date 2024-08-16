import styles from './ModalVerificacaoRedundancia.module.css'

const ModalVerificacaoRedundancia = ({ setOpenModalVerificacaoRedundancia }) => {
    return (
        <div className={styles.background}>

            <div className={styles.image_inform}>
                <div>
                    <i className='bi bi-exclamation-triangle'></i>
                </div>
            </div>

            <div className={styles.container}>
                <h2>Atenção!</h2>
                <div>
                    <p>Já existe um chamado criado para essa mesma Estação!</p>
                    <p>Verifique para que não haja duplicidade.</p>
                </div>
                <button
                    className={styles.button_confirm}
                    onClick={() => setOpenModalVerificacaoRedundancia(state => !state)}
                >
                    <span>Continuar</span>
                </button>
            </div>

        </div >
    )
}

export default ModalVerificacaoRedundancia
