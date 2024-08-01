import styles from './MyProfile.module.css';

// HOOKS
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider';
import { useApi } from '../../hooks/useApi';

// COMPONENTS
import Loading from '../../components/Geral/Loading/Loading';

const MyProfile = () => {

  const token = JSON.parse(localStorage.getItem('token'))

  const { fetchData, data, loading, } = useApi()

  const { user } = useAuth()
  
  const { register, setValue, handleSubmit, formState: { isSubmitting } } = useForm()
  
  async function getUser() {
    try {
      await fetchData(`auth/profile/${user.id}`, 'GET', null, null, token)
      
    } catch (error) {
      console.log(error)
    }
  }


  async function handleSubmitData(data) {
    try {
      await fetchData('auth/updateProfile', 'PATCH', data, null, token)

      await getUser()

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    setValue('name', data.name)
    setValue('id', user.id)
  }, [data])



  useEffect(() => {
    getUser()
    return
  }, [])


  if (loading) {
    return (
      <div className={styles.container_loading}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={styles.container}>

      {
        data.length === 0 ? (
          <h1>Meu perfil</h1>
        ) : (
          <div className={styles.information_profile}>
            <h1>{`Olá, ${data.name}`}</h1>
            <span>{`Função: ${data.funcao}`}</span>
          </div>
        )
      }

      <form onSubmit={handleSubmit(handleSubmitData)}>

        <label>
          <span>Nome:</span>
          <input
            type="text"
            {...register('name')}
            required
          />
        </label>

        <label>
          <span>
            E-mail:
            <span className={styles.email_information}>Seu e-mail é unico e não pode ser alterado</span>
          </span>
          <span className={styles.email}>{user.email}</span>
        </label>

        <label>
          <span>Senha antiga:</span>
          <input
            type="password"
            placeholder='Digite sua senha antiga'
            {...register('oldPassword')}
            autoComplete='old-password'
          />
        </label>

        <label>
          <span>Nova Senha</span>
          <input
            type="password"
            placeholder='Digite sua nova senha'
            {...register('newPassword')}
            autoComplete='new-password'
          />
        </label>

        <label>
          <span>Confirmar Nova Senha</span>
          <input
            type="password"
            placeholder='Confirme sua nova senha'
            {...register('confirmNewPassword')}
            autoComplete='confirm-new-password'
          />
        </label>

        <button
          className='btn_custom2'
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading /> : 'Atualizar'}
        </button>

      </form>
    </div>
  )
}

export default MyProfile
