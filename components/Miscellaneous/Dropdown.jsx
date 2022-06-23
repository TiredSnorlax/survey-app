import { useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import style from '../../styles/components/Dropdown.module.css'

const Dropdown = ({title, options, actions}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0);

  return (
    <div className={style.container}>
        <button className={style.btn} onClick={() => setOpen(!open)} >{title ? title : <BiDotsVerticalRounded />}</button>
        <div className={`${style.content} ${open ? style.open : ""} `} style={{'--num': options.length.toString()}}>
            { options.map( (option, i) => (
                <div className={`${selected == i && style.selected}`} key={i} onClick={() => {actions[i](); setOpen(false); setSelected(i)}}>
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