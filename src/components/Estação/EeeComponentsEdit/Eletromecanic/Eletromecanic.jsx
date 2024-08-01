import styles from './Eletromecanic.module.css'

const Eletromecanic = ({register}) => {

  return (
    <div>
      <h1>Eletromecanica</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nº de Posições</th>
            <th>Posições Instaladas</th>
            <th>Regime Operacional</th>
            <th>Em Manutenção</th>
            <th>Bombas Reservas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bombas</td>
            <td> <input type="number" {...register('numero_posicoes')}/> </td>
            <td> <input type="number"{...register('posicoes_instaladas')} /> </td>
            <td> <input type="text" {...register('regime_operacional')}/> </td>
            <td> <input type="number" {...register('em_manutencao')}/> </td>
            <td> <input type="number" {...register('bombas_reservas')}/> </td>
          </tr>
        </tbody>
      </table>

      <table className={styles.table}>
      <thead>
          <tr>
            <th className={styles.item}>Item</th>
            <th className={styles.second_head_has}>Possui</th>
            <th className={styles.second_head_not_has}>Não Possui</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.item}>Gerador</td>
            <td> <input {...register('gerador')} value={'Possui'} type="radio" /> </td>
            <td> <input {...register('gerador')} value={'Não Possui'}type="radio" /> </td>
          </tr>
          <tr>
            <td className={styles.item}>Monitoramento Remoto</td>
            <td> <input name='monitoramento_remoto' type="radio" value={'Possui'} {...register('monitoramento_remoto')}/> </td>
            <td> <input name='monitoramento_remoto' type="radio" value={'Não Possui'} {...register('monitoramento_remoto')}/> </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Eletromecanic
