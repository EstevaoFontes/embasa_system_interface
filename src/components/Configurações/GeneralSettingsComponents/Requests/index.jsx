import styles from './Requests.module.css';

// COMPONENTS 
import ComponentRequest from './ComponentRequest';
import Loading from '../../../Geral/Loading/Loading';

// HOOOK
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';

const Requests = () => {

  const token = JSON.parse(localStorage.getItem('token'))

  const { data, fetchData, loading, setData } = useApi()


  async function getAllUsersNoActive() {

    try {

      await fetchData('auth/getUsersNoActive', 'GET', null, null, token)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {
    getAllUsersNoActive()

    return 
  }, [])


  return (
    <main>
      <h2 className={styles.title}>Solicitações Pendentes</h2>

      {loading && <div className={styles.loading}><Loading /></div>}

      {!loading && data.length === 0 ? (
        <h4 className={styles.empty}>Nenhuma solicitação no momento</h4>
      ) : (
        data.map((user) => (
          <ComponentRequest
            user={user}
            key={user.id}
            getAllUsersNoActive={getAllUsersNoActive}
            dados={data}
            setData={setData}
          />
        ))
      )}
    </main>
  )
}

export default Requests


