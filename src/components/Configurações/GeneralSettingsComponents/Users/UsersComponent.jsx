import styles from './UsersComponent.module.css';
// HOOKS
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthProvider';
import { useApi } from '../../../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';

// COMPONENT
import Loading from '../../../Geral/Loading/Loading';
import ModalChangeManager from '../../Modals/ModalChangeManager/ModalChangeManager';
import ConfirmToExcludUser from '../../Modals/ModalConfirmToExcludeUser/ConfirmToExcludUser';

const UserComponent = ({ user, getAllUsers }) => {

  const token = JSON.parse(localStorage.getItem('token'))

  const [optionChosen, setOptionChosen] = useState('')
  const [openModalChangeToManager, setOpenModalChangeToManager] = useState(false)
  const [openModalConfirmExlcudeUser, setOpenModalConfirmExlcudeUser] = useState(false)


  const [searchParams, setSearchParams] = useSearchParams()

  const { fetchData } = useApi()

  const { options } = useAuth()

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm()

  const dateFormated = user.createdAt && new Date(user.createdAt).toLocaleString('pt-BR');

  const optionsFilter = options.filter(func => func !== user.funcao)

  async function handleSubmitData(data) {
    try {
      await fetchData('auth/updateuser', 'PATCH', data, null, token)
    } catch (error) {
      console.log(error)
    }
  }

  function confirmExcludeUser() {

    setSearchParams({ 'id': user.id, 'name': user.name })

    setOpenModalConfirmExlcudeUser(state => !state)
  }

  useEffect(() => {
    if (optionChosen === "Gerente" && user.funcao !== 'Gerente') {
      setOpenModalChangeToManager(state => !state)
    }
  }, [optionChosen])

  useEffect(() => {
    setValue('email', user.email)
  }, [])

  return (

    <div className={styles.component_container}>

      <i className='bi bi-person-fill' id={styles.figure}></i>

      <div className={styles.information_user}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.created}>{dateFormated}</span>
        <span className={styles.email}>{user.email}</span>
      </div>

      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className={styles.form}>

          <select {...register('funcao')} onChange={(e) => setOptionChosen(e.target.value)}>
            <option value={user.funcao ? user.funcao : ""}>{user.funcao ? user.funcao : ""}</option>
            {optionsFilter.map((func, index) => (
              <option value={func} key={index}>{func}</option>
            ))}
          </select>

          <div className={styles.button_container}>

            {isSubmitting && <Loading />}

            {!isSubmitting && user.funcao !== 'Gerente' && (
              <>
                <abbr title="Atualizar usuário">
                  <button
                    type='submit'
                    disabled={isSubmitting}
                  >
                    <i className='bi bi-arrow-clockwise'></i>
                  </button>
                </abbr>

                <abbr title="Excluir usuário">
                  <button
                    type='button'
                    disabled={isSubmitting}
                    onClick={() => confirmExcludeUser()}
                  >
                    <i className='bi bi-x'></i>
                  </button>
                </abbr>
              </>
            )}

          </div>

        </div>
      </form>

      {openModalConfirmExlcudeUser && (
        <ConfirmToExcludUser
          setOpenModal={setOpenModalConfirmExlcudeUser}
          getAllUsers={getAllUsers}
        />
      )}

      {openModalChangeToManager && <ModalChangeManager setOpenModalChangeManager={setOpenModalChangeToManager} />}

    </div>
  )
}

export default UserComponent





