import { MdAdd, MdClose } from 'react-icons/md'

import style from '../../../styles/edit/MCQ.module.css'

const MCQ = ({ options, deleteOption, changeOption, addOption}) => {
  return (
      <div className={style.questionContent} >
        {options.map( (option, i) => (
          <div key={i} className={style.optionItem}>
            <p>{i + 1}.</p>
            <input type="text" value={option} onChange={(e) => changeOption(e, i)} />
            <button onClick={() => deleteOption(i)} ><MdClose /></button>
          </div>
        ))}
        <button className={style.addOptionBtn} onClick={addOption}><MdAdd /></button>
      </div>
  )
}

export default MCQ