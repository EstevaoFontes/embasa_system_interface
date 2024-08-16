import styles from './Flags.module.css'

import { useState } from 'react'

const Flags = ({ color, position_horizontal, position_vertical, text, text2 }) => {

    const [showDescription, setShowDescription] = useState(false)

    let styles_flag = {
        "color": color,
        [position_vertical]: '0.2em',
        [position_horizontal]: '0.2em',
    };

    return (
        <i
            className='bi bi-flag-fill'
            id={styles.flag}

            style={styles_flag}

            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            <div
                className={showDescription ? styles.flag_information_show : styles.flag_information_none}
            >
                <p>{text}</p>
                <p>{text2}</p>
            </div>
        </i>
    )
}

export default Flags
