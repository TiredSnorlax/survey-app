import { useRef, useEffect, useState } from 'react'

import styles from '../../styles/Results.module.css'
import MCQ from './QuestionTypes/MCQ';
import OE from './QuestionTypes/OE';
import Slider from './QuestionTypes/Slider';


const GraphContainer = ({ index, question, data }) => {


  return (
      <div className={styles.resultItem}>
        <h3>{question && question.content}</h3>
        { question.type === "mcq" && <MCQ index={index} question={question} data={data} />}
        { question.type === "oe" && <OE data={data} />}
        { question.type === "slider" && <Slider index={index} question={question} data={data} />}
      </div>
  )
}

export default GraphContainer