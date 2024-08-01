import styles from './PdfCall.module.css';

const ItemsTable = ({ chamado, excluirLinha }) => {
    return (

        <tr className={styles.itemsBody}>

            <td className={styles.linhas}>
                {chamado.unidade}
            </td>

            <td className={styles.linhas}>
                {chamado.endereco}
            </td>

            <td className={styles.linhas}>
                {chamado.createdAt}
            </td>

            <td className={styles.linhas}>
                {chamado.dataEncerramento}
            </td>

            <td className={styles.linhas}>
                {chamado.tempoTotalExtravasamento}
            </td>

            <td className={styles.linhas} id={styles.motivo}>
                {chamado.motivo}

                <button className={styles.excluir_linha} onClick={() => excluirLinha(chamado.id)}>
                    <i className="bi bi-x"></i>
                </button>
            </td>
        </tr>
    )
}

export default ItemsTable