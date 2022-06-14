import style from '../../../styles/edit/OE.module.css'

const OE = () => {
  return (
    <div className={style.questionContent} >
        <textarea disabled rows="3" placeholder='This is an Open Ended question...'></textarea>
    </div>
  )
}

export default OE