import styles from './GeneralSettings.module.css';
import { useState } from 'react';

// COMPONENTS
import Requests from '../../components/Configurações/GeneralSettingsComponents/Requests/index'
import Users from '../../components/Configurações/GeneralSettingsComponents/Users/index';
import Reports from '../../components/Configurações/GeneralSettingsComponents/Reports/Reports';
import SideBar from '../../components/Geral/SideBar/SideBar';

const GeneralSettings = () => {

    const [actionSelected, setActionSelected] = useState(null);
    
    const itemsActions = [<Requests />, <Users />, <Reports />];

    const acoes_side_bar = {
        'Solicitações pendentes': () => setActionSelected(itemsActions[0]),
        'Usuários': () => setActionSelected(itemsActions[1]),
        'Relatórios Detalhados': () =>  setActionSelected(itemsActions[2])
    }

    return (
        <div className={styles.container}>

            <SideBar objeto={acoes_side_bar}/>

            <div className={styles.float_container}>
                
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
