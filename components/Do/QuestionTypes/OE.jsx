import React from 'react'
import styles from '../../../styles/DoSurvey.module.css'


const OE = ({question, clearHighLight}) => {
  const checkEmpty = (e) => {
    if (e.target.value) {
      clearHighLight();
    }
  }


  return (
    <div className={styles.OEcontainer} >
      <textarea name={question._id} onChange={checkEmpty} ></textarea>
    </div>
  )
}

export default OE