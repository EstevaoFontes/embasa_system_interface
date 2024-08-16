import styles from './VisualStatus.module.css'

const VisualStatus = ({color, legenda, }) => {
    return (
        <abbr title={legenda}>
            <div className={styles.status} style={{backgroundColor: color}}></div>
        </abbr>
    )
}

export default VisualStatus
