import { useState, useEffect } from 'react'

import surveyStyle from '../../styles/Survey.module.css';
import style from '../../styles/DoSurvey.module.css';

const DoSurveyQuestion = ({ q, highlightedQuestions, setHighlightedQuestions }) => {
    const [question, setQuestion] = useState(q);
    const [highlighted, setHighlighted] = useState(false);

    useEffect(() => {
        if (highlightedQuestions.includes(q._id)) {
            setHighlighted(true);
        }
    }, [highlightedQuestions])

    const clearHighLight = () => {
        if (highlighted) {
            setHighlighted(false);
        }
    }


  return (
    <div className={`${surveyStyle.questionContainer} ${highlighted ? style.highlighted : ""} ${style.questionContainer} `} >
        <h2>{question.content}{question.content[-1] === "?" ? "" : "?"}</h2>
        <div className={style.optionsList}>
            { question && question.options.map( (option, i) => (
                <div key={i} className={style.option} >
                    <input type='radio' id={question._id + ":" + i} name={"mcq:" + question._id} value={option} onClick={clearHighLight} />
                    <label htmlFor={question._id + ":" + i}>{option}</label>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoSurveyQuestion