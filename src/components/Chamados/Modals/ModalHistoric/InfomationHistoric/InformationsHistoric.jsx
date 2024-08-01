import styles from './InformationsHistoric.module.css'

const InformationsHistoric = ({ createdBy, data, title, informatioHistoric, style }) => {

    return (
        <div className={styles.informations_historic}>
            <div className={styles.icon_name}>
                <i className='bi bi-person-circle'></i>
                <span>{createdBy}</span>
                <span
                    className={styles.informatioHistoric}
                    style={{color: style}}
                >
                    ({informatioHistoric})
                </span>
            </div>
            <span className={styles.title}>{title}</span>
            <span className={styles.date}>{data}</span>
        </div>
    )
}

export default InformationsHistoric 
