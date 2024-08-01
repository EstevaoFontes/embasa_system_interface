import styles from './CampoAtualizacao.module.css'

const CalledFields = ({ register, index, remove, fieldsId }) => {

  return (
    <div className={styles.container_att} key={fieldsId}>
      <input
        type="text"
        {...register(`atualizacoes.${index}.title`)}
        placeholder='Informe uma Atualização do chamado'
        className={styles.input_att}
      />
      <button className={styles.remove} type='button' onClick={() => remove(index)}>
        <i className='bi bi-x'></i>
      </button>
    </div>
  )
}

export default CalledFields
