import { useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import style from '../../styles/components/Dropdown.module.css'

const Dropdown = ({title, options, actions}) => {
    const [open, setOpen] = useState(false);

  return (
    <div className={style.container}>
        <button className={style.btn} onClick={() => setOpen(!open)} >{title ? title : <BiDotsVerticalRounded />}</button>
        <div className={`${style.content} ${open ? style.open : ""}`} style={{'--num': options.length.toString()}}>
            { options.map( (option, i) => (
                <div key={i} onClick={() => {actions[i](); setOpen(false);}}>
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