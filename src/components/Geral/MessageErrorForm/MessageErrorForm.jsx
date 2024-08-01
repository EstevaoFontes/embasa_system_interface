import styles from './MessageErrorForm.module.css'

const MessageErrorForm = ({ message, color = false }) => {
  return (
    <div className={styles.container}>
      <i id={color ? styles.errors_white : styles.errors} className='bi-x-circle'></i>
      <span id={color ? styles.errors_white : styles.errors} className='message_error'>{message}</span>
    </div>
  )
}

export default MessageErrorForm
