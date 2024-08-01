import styles from '../ModalInfo.module.css'

import { useState } from 'react'

const ItemAtualizacoes = ({ data }) => {

  const [atualizationCall, setAtualizationCall] = useState(false)

  return (
    <>
      <div className={styles.sections} onClick={() => setAtualizationCall(state => !state)}>
        <h3 className={styles.textRender}>Atualizações</h3>
        <i className={atualizationCall ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}></i>
      </div>

      {
        (atualizationCall && data.atualizacoes) && (
          data.atualizacoes.map((atualizazao, index) => (
            <fieldset key={index}>
              <legend>{`Atualização ${index + 1}`}</legend>
              <abbr title={atualizazao.title}>
                <p>{atualizazao.title}</p>
              </abbr>
            </fieldset>
          ))
        )
      }
    </>
  )
}

export default ItemAtualizacoes
