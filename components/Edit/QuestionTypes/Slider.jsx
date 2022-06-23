import { useEffect, useState } from 'react'
import style from '../../../styles/edit/Slider.module.css'

const Slider = ({ options, changeOption, addOption }) => {
    const [min, setMin] = useState(options[0] ? parseInt(options[0]) : 1);
    const [max, setMax] = useState(options[1] ? parseInt(options[1]) : 10);

    const [invalid, setInvalid] = useState(false);


    useEffect(() => {
        const _missing = 2 - options.length;
        for (let i = 0; i < _missing; i++) {
            addOption();
        }
    }, [])

    useEffect(() => {
        if (change()) {
            changeOption(parseInt(min), 0);
            changeOption(parseInt(max), 1);
        }
    }, [min, max])


    const change = () => {
        if (min > max || max < min) {
            setInvalid(true);
            return false
        } else {
            setInvalid(false);
            return true
        }
    }


  return (
    <>
      <div className={`${style.questionContent} ${invalid ? style.invalid : ""}`} >
            <input type={"number"} onChange={(e) => setMin(e.target.value)} value={min} />
            <input type={"range"} min={min} max={max} value={5} disabled/>
            <input type={"number"} onChange={(e) => setMax(e.target.value)} value={max} />
      </div>
      { invalid && <p>Your minimum value must be lower than your maximum</p>}

    </>
  )
}

export default Slider