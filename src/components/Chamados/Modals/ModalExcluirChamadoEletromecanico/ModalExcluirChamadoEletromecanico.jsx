import styles from './ModalExcluirChamadoEletromecanico.module.css'
// HOOKS
import { useApi } from '../../../../hooks/useApi'
import { useSearchParams } from 'react-router-dom';
// COMPONENTS
import Loading from '../../../Geral/Loading/Loading';

const ModalExcluirRegistro = ({ getData, openModalExcluir }) => {

  const token = JSON.parse(localStorage.getItem('token'))

  const { fetchData, loading } = useApi()

  const [searchParams] = useSearchParams()

  const id = searchParams.get('id')

  const data = {
    nota_mpm: searchParams.get('nota_mpm')
  }
 

  async function excluirLinha() {
    try {
      await fetchData(`chamadosEletromecanicos/deleteCalled/${id}`, 'DELETE', data, null, token)

    } catch (error) {
      console.log(error)

    } finally {
      await getData()
      openModalExcluir(state => !state)
    }

  }

  return (
    <div className={styles.background}>

      <div className={styles.registro_inform}>
        <div>
          <i id={styles.icon} className='bi bi-exclamation-circle'></i>
        </div>
      </div>

      <div className={styles.container}>

        <p>Confirma a exclusão do registro ? </p>

        <div className={styles.button_container}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <button
                className={styles.confirm_button}
                onClick={() => excluirLinha()}
              >
                Excluir
              </button>
              <button
                className={styles.cancel_button}
                onClick={() => openModalExcluir(state => !state)}
              >
                Cancelar
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default ModalExcluirRegistro
