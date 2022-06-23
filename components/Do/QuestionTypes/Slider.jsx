import { useState } from 'react'

import style from '../../../styles/DoSurvey.module.css'

const Slider = ({question}) => {
    const [value, setValue] = useState(5);
  return (
    <div className={style.sliderContainer}>
        <div className={style.slider}>
            <p>{question.options[0]}</p>
            <input
              type='range'
              min={parseInt(question.options[0])}
              max={parseInt(question.options[1])}
              name={question._id}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p>{question.options[1]}</p>
        </div>
        <p>{value}</p>
    </div>
  )
}

export default Slider