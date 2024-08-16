import styles from './SideBar.module.css'

import { useState } from 'react'

const SideBar = ({ objeto }) => {
    const [showSideBar, setShowSideBar] = useState(false)

    return (
        <>
            <button
                className={showSideBar ? styles.close_side_bar : styles.show_side_bar}
                onClick={() => setShowSideBar(state => !state)}
            >
                <i className={showSideBar ? 'bi bi-x' : 'bi bi-list'}></i>
            </button>

            {showSideBar && (
                <aside className={styles.side_bar}>
                    <ul>
                        {Object.keys(objeto).map((key, index) => (
                            <li
                                key={index}
                                onClick={objeto[key]}
                            >
                                <span>{key}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            )}
        </>
    )
}

export default SideBar
