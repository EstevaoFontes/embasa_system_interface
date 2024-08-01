
import styles from './Operation.module.css'

const Operation = ({ register }) => {

  return (
    <div>
      <h1>Operacional</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>NA</th>
            <th>C</th>
            <th>NC</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Grade Vertical</td>
            <td> <input {...register('grade_vertical')} value='NA' type="radio" /> </td>
            <td> <input {...register('grade_vertical')} value='C' type="radio" /> </td>
            <td> <input {...register('grade_vertical')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('grade_vertical_observacao')}
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Grade Horizaontal</td>
            <td> <input {...register('grade_horizontal')} value='NA' type="radio" /> </td>
            <td> <input {...register('grade_horizontal')} value='C' type="radio" /> </td>
            <td> <input {...register('grade_horizontal')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('grade_horizontal_observacao')}
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Stoplogs</td>
            <td> <input {...register('stoplogs')} value='NA' type="radio" /> </td>
            <td> <input {...register('stoplogs')} value='C' type="radio" /> </td>
            <td> <input {...register('stoplogs')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('stoplogs_observacao')}
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Instalações Elétricas</td>
            <td> <input {...register('instalacao_eletrica')} value='NA' type="radio" /> </td>
            <td> <input {...register('instalacao_eletrica')} value='C' type="radio" /> </td>
            <td> <input {...register('instalacao_eletrica')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('instalacao_eletrica_observacao')}
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Instalação Hidráulica</td>
            <td> <input {...register('instalacao_hidraulica')} value='NA' type="radio" /> </td>
            <td> <input {...register('instalacao_hidraulica')} value='C' type="radio" /> </td>
            <td> <input {...register('instalacao_hidraulica')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('instalacao_hidraulica_observacao')}
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Quadro de Comando</td>
            <td> <input {...register('quadro_comando')} value='NA' type="radio" /> </td>
            <td> <input {...register('quadro_comando')} value='C' type="radio" /> </td>
            <td> <input {...register('quadro_comando')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('quadro_comando_observacao')}
              >
              </textarea>
            </td>
          </tr>

          <tr>
            <td>Sensor de Nível</td>
            <td> <input {...register('sensor_nivel')} value='NA' type="radio" /> </td>
            <td> <input {...register('sensor_nivel')} value='C' type="radio" /> </td>
            <td> <input {...register('sensor_nivel')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('sensor_nivel_observacao')}
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Registro/ Comporta</td>
            <td> <input {...register('registro_comporta')} value='NA' type="radio" /> </td>
            <td> <input {...register('registro_comporta')} value='C' type="radio" /> </td>
            <td> <input {...register('registro_comporta')} value='NC' type="radio" /> </td>
            <td>
              <textarea
                maxLength={79}
                placeholder='Digite uma observação sobre o item...'
                {...register('registro_comporta_observacao')}
              >
              </textarea>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default Operation
