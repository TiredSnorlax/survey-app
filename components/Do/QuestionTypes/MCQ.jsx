import React from 'react'
import style from '../../../styles/DoSurvey.module.css'

const MCQ = ({ question, clearHighLight }) => {
  return (
        <div className={style.optionsList}>
            { question && question.options.map( (option, i) => (
                <div key={i} className={style.option} >
                    <input type='radio' id={question._id + ":" + i} name={question._id} value={option} onClick={clearHighLight} />
                    <label htmlFor={question._id + ":" + i}>{option}</label>
                </div>
            ))}
        </div>
  )
}

export default MCQ