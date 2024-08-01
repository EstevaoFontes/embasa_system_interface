import styles from './Steps.module.css'

const Steps = ({ currentStep, changeStep }) => {

  const handleSteps = () => {
    
  }

  return (
    <div className={styles.steps}>

      <div className={styles.steps_active}>
        <abbr title="Dados">
          <i 
          id={currentStep >= 0 ? styles.icons_active : styles.icons_no_active} 
          className='bi-database-add'
          onClick={() => changeStep(currentStep = 0)}
          ></i>
        </abbr>
      </div>

      <i id={currentStep >= 1 ? styles.arrow_active : ""} className='bi-arrow-right'></i>

      <div className={currentStep >= 1 ? styles.steps_active : styles.steps_no_active}>
        <abbr title="Eletromecânica">
          <i
          id={currentStep >= 1 ? styles.icons_active : styles.icons_no_active} 
          className='bi-gear-wide-connected'
          onClick={() => changeStep(currentStep = 1)}
          ></i>
        </abbr>
      </div >

      <i id={currentStep >= 2 ? styles.arrow_active : ""} className='bi-arrow-right'></i>

      <div className={currentStep >= 2 ? styles.steps_active : styles.steps_no_active}>
        <abbr title="Diagnóstico">
          <i 
          id={currentStep >= 2 ? styles.icons_active : styles.icons_no_active} 
          className='bi-cone-striped'
          onClick={() => changeStep(currentStep = 2)}
          ></i>
        </abbr>
      </div>

      <i id={currentStep >= 3 ? styles.arrow_active : ""} className='bi-arrow-right'></i>

      <div className={currentStep >= 3 ? styles.steps_active : styles.steps_no_active}>
        <abbr title="Operacional">
          <i 
          id={currentStep >= 3 ? styles.icons_active : styles.icons_no_active} 
          className='bi-person-fill-gear'
          onClick={() => changeStep(currentStep = 3)}
          ></i>
        </abbr>
      </div>

      <i id={currentStep >= 4 ? styles.arrow_active : ""} className='bi-arrow-right'></i>

      <div className={currentStep >= 4 ? styles.steps_active : styles.steps_no_active}>
        <abbr title="Registros Fotográficos">
          <i 
          id={currentStep >= 4 ? styles.icons_active : styles.icons_no_active} 
          className='bi-image-fill'
          onClick={() => changeStep(currentStep = 4)}
          ></i>
        </abbr>
      </div>

    </div>
  )
}

export default Steps
