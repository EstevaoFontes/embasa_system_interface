import styles from './GeneralSettings.module.css';
import { useState } from 'react';

// COMPONENTS
import Requests from '../../components/Configurações/GeneralSettingsComponents/Requests/index'
import Users from '../../components/Configurações/GeneralSettingsComponents/Users/index';
import Reports from '../../components/Configurações/GeneralSettingsComponents/Reports/Reports';

const GeneralSettings = () => {

    const [showSideBar, setShowSideBar] = useState(true)
    const [actionSelected, setActionSelected] = useState();
    
    const itemsActions = [<Requests />, <Users />, <Reports />];

    return (
        <div className={styles.container}>

            <button
                className={showSideBar ? styles.close_side_bar : styles.show_side_bar}
                onClick={() => setShowSideBar(state => !state)}
            >
                <i className={showSideBar ? 'bi bi-x' : 'bi bi-list'}></i>
            </button>

            <aside className={showSideBar ? styles.side_bar : styles.side_bar_none}>
                <ul>
                    <li onClick={() => setActionSelected(itemsActions[0])}>
                        <span>Solicitações pendentes</span>
                    </li>

                    <li onClick={() => setActionSelected(itemsActions[1])}>
                        <span>Usuários</span>
                    </li>

                    <li onClick={() => setActionSelected(itemsActions[2])}>
                        <span> Relatórios Detalhados </span>
                    </li>

                </ul>
            </aside>

            <div className={styles.float_container} >
                {!actionSelected && (
                    <div className={styles.empty}>
                        <i className='bi bi-arrow-left'></i>
                        <h2>Selecione uma das opções ao lado para realizar uma Ação</h2>
                    </div>
                )}

                {actionSelected && actionSelected}
            </div>

        </div>
    )
}

export default GeneralSettings;
