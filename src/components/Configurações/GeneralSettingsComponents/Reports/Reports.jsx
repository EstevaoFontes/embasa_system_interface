import { useState } from 'react'
import styles from './Reports.module.css'

const Reports = () => {

  const [month, setMonth] = useState()

  return (
    <div className={styles.container}>

      <h2>Relatório Detalhado</h2>

      <form>

        <label>
          <span>Selecione o mês e o ano</span>
          <input type="month" onChange={(e) => setMonth(e.target.value)} />
        </label>
        <button className='btn_custom2' type='button' onClick={(e) => e.preventDefault}>Gerar</button>

      </form>
    </div>
  )
}

export default Reports
