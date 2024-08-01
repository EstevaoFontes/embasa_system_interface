import styles from '../ModalInfo.module.css'

import { useState } from 'react'

const ItemIndeveido = ({ data }) => {

    const [indevidoCall, setIndevidoCall] = useState(false)

    return (
        <>
            <div className={styles.sections} onClick={() => setIndevidoCall(state => !state)}>
                <h3 className={styles.textRender}>Dados Chamado Indevido</h3>
                <i className={indevidoCall ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}></i>
            </div>

            {indevidoCall && (
                <fieldset>
                    <legend>Observação indevido</legend>
                    <abbr title={data.observacaoIndevido}>
                        <p>{data.observacaoIndevido}</p>
                    </abbr>
                </fieldset>
            )}
        </>
    )
}

export default ItemIndeveido
