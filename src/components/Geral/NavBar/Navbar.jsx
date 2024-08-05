import styles from './NavBar.module.css';

import { NavLink } from 'react-router-dom';

import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate()

    const { user, permissions, authorization, logout } = useAuth()

    return (
        <div className={styles.nav}>
            <span className={styles.sistem_name}>Plataforma Distribuída de Informações</span>
            <nav>
                {authorization && (
                    <ul className={styles.links_list}>

                        {(user.funcao !== 'Manutenção' && user.funcao !== 'Visitante') && (
                            <>
                                <li>
                                    <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : "")}>
                                        <span>Chamados</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <abbr title="Estação Elevatória de Esgoto">
                                        <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to='/eee'>
                                            <span>Estações</span>
                                        </NavLink>
                                    </abbr>
                                </li>
                            </>
                        )}

                        <li>
                            <NavLink to='/planilha' className={({ isActive }) => (isActive ? styles.active : "")}>
                                <span>Registros PPCM</span>
                            </NavLink>
                        </li>

                        {
                            permissions.pages.includes(user?.funcao) && (
                                <li>
                                    <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to='/managerArea'>
                                        <span>Configurações Gerais</span>
                                    </NavLink>
                                </li>
                            )
                        }

                        <li className={styles.profile}>
                            <i className='bi bi-person-circle'></i>
                            <ul className={styles.options_navBar}>
                                <li onClick={() => navigate('/myProfile')}>
                                    <i className='bi bi-person'></i>
                                    <span>Meu Perfil</span>
                                </li>
                                <li onClick={logout}>Sair</li>
                            </ul>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    )
};

export default NavBar;