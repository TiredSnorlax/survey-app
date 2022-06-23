import { useState, useEffect } from 'react'

import surveyStyle from '../../styles/Survey.module.css';
import style from '../../styles/DoSurvey.module.css';

import MCQ from './QuestionTypes/MCQ';
import OE from './QuestionTypes/OE';
import Slider from './QuestionTypes/Slider';

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
        <h2>{question.content}</h2>
        { question.type === "mcq" && <MCQ question={question} clearHighLight={clearHighLight} /> }
        { question.type === "oe" && <OE question={question} clearHighLight={clearHighLight} /> }
        { question.type === "slider" && <Slider question={question} /> }
    </div>
  )
}

export default DoSurveyQuestion