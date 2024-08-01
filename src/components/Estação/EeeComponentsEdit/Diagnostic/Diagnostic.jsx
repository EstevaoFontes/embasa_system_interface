import styles from './Diagnostic.module.css'

const Diagnostic = ({ register }) => {
  return (
    <div>
      <h1>Diagnóstico</h1>
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
            <td>Abrigo do Quadro de Comando</td>
            <td> <input {...register('abrigo_quadro_comando')} value='NA' type="radio" />  </td>
            <td> <input {...register('abrigo_quadro_comando')} value='C' type="radio" /> </td>
            <td> <input {...register('abrigo_quadro_comando')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('abrigo_quadro_comando_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Guarda Corpos</td>
            <td> <input {...register('guarda_corpo')} value='NA' type="radio" />  </td>
            <td> <input {...register('guarda_corpo')} value='C' type="radio" /> </td>
            <td> <input {...register('guarda_corpo')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('guarda_corpo_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Corrimões</td>
            <td> <input {...register('corrimoes')} value='NA' type="radio" />  </td>
            <td> <input {...register('corrimoes')} value='C' type="radio" /> </td>
            <td> <input {...register('corrimoes')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('corrimoes_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Escadas</td>
            <td> <input {...register('escadas')} value='NA' type="radio" />  </td>
            <td> <input {...register('escadas')} value='C' type="radio" /> </td>
            <td> <input {...register('escadas')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('escadas_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Tampas</td>
            <td> <input {...register('tampas')} value='NA' type="radio" />  </td>
            <td> <input {...register('tampas')} value='C' type="radio" /> </td>
            <td> <input {...register('tampas')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('tampas_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Delimitações</td>
            <td> <input {...register('delimitacoes')} value='NA' type="radio" />  </td>
            <td> <input {...register('delimitacoes')} value='C' type="radio" /> </td>
            <td> <input {...register('delimitacoes')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('delimitacoes_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Lajes</td>
            <td> <input {...register('lajes')} value='NA' type="radio" />  </td>
            <td> <input {...register('lajes')} value='C' type="radio" /> </td>
            <td> <input {...register('lajes')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('lajes_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr>
          <tr>
            <td>Pintura</td>
            <td> <input {...register('pintura')} value='NA' type="radio" />  </td>
            <td> <input {...register('pintura')} value='C' type="radio" /> </td>
            <td> <input {...register('pintura')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('pintura_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
          <tr>
            <td>Acesso/Pavimento</td>
            <td> <input {...register('acesso')} value='NA' type="radio" />  </td>
            <td> <input {...register('acesso')} value='C' type="radio" /> </td>
            <td> <input {...register('acesso')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('acesso_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
          <tr>
            <td>Portões</td>
            <td> <input {...register('portoes')} value='NA' type="radio" />  </td>
            <td> <input {...register('portoes')} value='C' type="radio" /> </td>
            <td> <input {...register('portoes')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('portoes_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
          <tr>
            <td>Placa de Identificação</td>
            <td> <input {...register('placa_identificacao')} value='NA' type="radio" />  </td>
            <td> <input {...register('placa_identificacao')} value='C' type="radio" /> </td>
            <td> <input {...register('placa_identificacao')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('placa_identificacao_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
          <tr>
            <td>Placa de Sinalização</td>
            <td> <input {...register('placa_sinalizacao')} value='NA' type="radio" />  </td>
            <td> <input {...register('placa_sinalizacao')} value='C' type="radio" /> </td>
            <td> <input {...register('placa_sinalizacao')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('placa_sinalizacao_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
          <tr>
            <td>Extintor</td>
            <td> <input {...register('extintor')} value='NA' type="radio" />  </td>
            <td> <input {...register('extintor')} value='C' type="radio" /> </td>
            <td> <input {...register('extintor')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('extintor_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
          <tr>
            <td>Cadeados</td>
            <td> <input {...register('cadeados')} value='NA' type="radio" />  </td>
            <td> <input {...register('cadeados')} value='C' type="radio" /> </td>
            <td> <input {...register('cadeados')} value='NC' type="radio" /> </td>
            <td> <textarea {...register('cadeados_observacao')} maxLength={79} placeholder='Digite uma observação sobre o item...'></textarea> </td>
          </tr >
        </tbody >
      </table >
    </div >
  )
}

export default Diagnostic
