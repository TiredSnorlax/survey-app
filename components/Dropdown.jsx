import { useState } from 'react'
import {FaChevronDown} from 'react-icons/fa'
import style from '../styles/components/Dropdown.module.css'

const Dropdown = ({title, options, actions}) => {
    const [open, setOpen] = useState(false);

  return (
    <div className={style.container}>
        <button className={style.btn} onClick={() => setOpen(!open)} >{title ? title : <FaChevronDown />}</button>
        <div className={`${style.content} ${open ? style.open : ""}`} style={{'--num': options.length.toString()}}>
            { options.map( (option, i) => (
                <div onClick={() => {actions[i](); setOpen(false);}}>
                    <p>
                        {option}
                    </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Dropdown