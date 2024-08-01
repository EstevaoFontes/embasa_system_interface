import styles from './UsersComponent.module.css'
// HOOK
import { useState, useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi'

// COMPONENT
import Loading from '../../../Geral/Loading/Loading';
import UserComponent from './UsersComponent'

const Users = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [search, setSearch] = useState("")

    const { data, fetchData, loading } = useApi()

    const filteredList = search.length > 0 ? data.filter(user => user.name.toLowerCase().includes(search.toLowerCase())) : []

    async function getAllUsers() {
        try {
            await fetchData('auth/allUsers', 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
        return
    }, [])

    return (
        <div className={styles.container}>

            <h2 className={styles.title}>Usuários</h2>

            <div className={styles.search}>
                <input
                    type="text"
                    placeholder='Pesquise um usuário'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <i className='bi bi-search'></i>
            </div>

            {loading &&
                <div className={styles.loading}>
                    <Loading />
                </div>
            }

            {!loading && data.length === 0 && (
                <h3>Nenhum usuário cadastrado ainda...</h3>
            )}

            {search.length > 0 ? (
                filteredList.map((user) => (
                    <UserComponent
                        user={user}
                        key={user.id}
                        getAllUsers={getAllUsers}
                    />
                ))
            ) : (
                data.map((user) => (
                    <UserComponent
                        user={user}
                        key={user.id}
                        getAllUsers={getAllUsers}
                    />
                ))
            )}

        </div>

    )
}

export default Users