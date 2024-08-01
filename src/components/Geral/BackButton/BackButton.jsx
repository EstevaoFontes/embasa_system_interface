import styles from './BackButton.module.css'

import { useNavigate } from 'react-router-dom'

const BackButton = ({ to }) => {

    const navigate = useNavigate()

    return (
        <>
            <button className={styles.navigate} onClick={() => navigate(to ? `/${to}` : "/")}>
                <i className='bi bi-arrow-left'></i>
            </button>
        </>
    )
}

export default BackButton
