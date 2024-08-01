import styles from './Requests.module.css'

// HOOKS
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../../context/AuthProvider';
import { useApi } from '../../../../hooks/useApi';

// COMPONENTS
import Loading from '../../../Geral/Loading/Loading';
import ModalChangeManager from '../../Modals/ModalChangeManager/ModalChangeManager';


const ComponentRequest = ({ user, getAllUsersNoActive, dados, setData }) => {

  const token = JSON.parse(localStorage.getItem('token'))

  const [optionChosen, setOptionChosen] = useState('')
  const [openModalChangeToManager, setOpenModalChangeToManager] = useState(false)

  const { fetchData } = useApi()

  const { register, handleSubmit, setValue, formState: { error, isSubmitting } } = useForm()

  const { options } = useAuth()

  const [idUser] = useState(user.id || null)

  const date = new Date(user.createdAt).toLocaleString('pt-BR');


  async function handleSubmitData(data) {

    try {

      await fetchData('auth/acceptUser', 'PATCH', data, null, token)

      getAllUsersNoActive()

    } catch (error) {

      console.log(error)

    }
  }



  async function handleDeleteUserSolicitation() {

    try {

      await fetchData(`auth/removeUser/${idUser}`, 'DELETE', null, null, token)

    } catch (error) {

      console.log(error)

    } finally {

      const updatedUsersRequests = dados.filter(user => user.id !== idUser)

      setData(updatedUsersRequests)
    }

  }

  useEffect(() => {
    if (optionChosen === "Gerente") {
      setOpenModalChangeToManager(state => !state)
    }
  }, [optionChosen])

  useEffect(() => {
    setValue("id", user.id)
  }, [])

  return (
    <div className={styles.container}>

      <i className='bi bi-person-bounding-box' id={styles.figure}></i>

      <div className={styles.informations}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.email}>{user.email}</span>
        <span className={styles.date}>{date}</span>
      </div>

      <form onSubmit={handleSubmit(handleSubmitData)}>

        <div className={styles.form}>
          <select {...register('funcao')} onChange={(e) => setOptionChosen(e.target.value)}>

            <option></option>
            {options.map((func, index) => (
              <option value={func} key={index}>{func}</option>
            ))}

          </select>

          <div className={styles.button_container}>

            {
              isSubmitting ? (
                <Loading />
              ) : (
                <>
                  <abbr title="Aceitar solicitação">
                    <button type='submit' disabled={isSubmitting}>
                      <i className='bi bi-check'></i>
                    </button>
                  </abbr>

                  <abbr title="Recusar solicitação">
                    <button
                      type='button'
                      disabled={isSubmitting}
                      onClick={handleDeleteUserSolicitation}
                    >
                      <i className='bi bi-x'></i>
                    </button>
                  </abbr>
                </>
              )
            }

          </div>

        </div>
      </form>
      {openModalChangeToManager && <ModalChangeManager setOpenModalChangeManager={setOpenModalChangeToManager} />}
    </div>
  )
}

export default ComponentRequest
