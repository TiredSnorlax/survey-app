import { useEffect, useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md'

import style from '../../styles/Survey.module.css'
import MCQ from './QuestionTypes/MCQ'
import OE from './QuestionTypes/OE'
import Dropdown from '../Miscellaneous/Dropdown'

const EditSurveyQuestions = ({q, editing, usingTouch, index, setDrag, drag, swapQuestions, updateQuestions, updateAllQs}) => {
  const [question, setQuestion] = useState(q);

  const [content, setContent] = useState("");
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");

  var scrollUpInterval;
  var scrollDownInterval;

  const questionTypeOptions = ["mcq", "oe"];
  const questionTypeActions = [
    () => setType("mcq"),
    () => setType("oe"),
  ];


  const setupQuestion = (question) => {
    setContent(question.content);
    setType(question.type);
    let _options = [];
    question.options.map((option, i) => {
      _options.push(option);
    })
    setOptions([..._options]);
  }


  useEffect(() => {
    if (!question || !updateAllQs) return;
    let _question = question;
    _question.options = options;
    _question.content = content;
    _question.type = type;
    updateQuestions(index, _question);
  }, [updateAllQs])


  useEffect(() => {
    if (!q) return;
    setQuestion({...q});
    // if (!question) return;
    setupQuestion(q);
  }, [q])


  const changeOption = (e, i) => {
    let _options = options;
    let _option = options[i];
    if (e.target.value !== _option) {
      _options[i] = e.target.value;
    }
    setOptions([..._options]);
  }

  const addOption = () => {
    let _options = options;
    _options.push("");
    setOptions([..._options]);
  }

  const deleteOption = (i) => {
    let _options = options;
    _options.splice(i, 1);
    console.log(_options);
    setOptions([..._options]);
  }

  const startDrag = (ev, i) => {
    ev.dataTransfer.setData("index", i);
    setDrag(index);
  }

  const allowDrop = (e) => {
      e.preventDefault();
  }

  const drop = (ev) => {
    ev.preventDefault();
    if (drag == index) return;
    var data = ev.dataTransfer.getData("index");
    console.log(data);
    console.log(data, index);
    swapQuestions(data, index);
  }

  const touchStart = (e) => {
    if (editing) {
      setDrag(index);
      let touchLocation = e.targetTouches[0];
      console.log(touchLocation);
    }
  }

  const touchMove = (e) => {
    if (editing) {
      // if clientY is higher than something, scroll up
      let touchLocation = e.targetTouches[0];
      if (parseInt(touchLocation.clientY) < 60) {
        if (!scrollUpInterval) {
          scrollUpInterval = setInterval(() => {
            window.scrollBy(0, -2);
          }, 5);
        }
      } else if (window.innerHeight - parseInt(touchLocation.clientY) < 50) {
        if (!scrollDownInterval) {
          scrollDownInterval = setInterval(() => {
            window.scrollBy(0, 2);
          }, 5);
        }
      } else {
          if (scrollUpInterval) {
            clearInterval(scrollUpInterval);
            scrollUpInterval = undefined;
          } else if (scrollDownInterval) {
            clearInterval(scrollDownInterval)
            scrollDownInterval = undefined;
          }
      }

      // do some animations for the scrolling
    }

  }

  const touchEnd = (e) => {
    if (editing) {
      let touchLocation = e.changedTouches[0];
      // console.log(touchLocation);

      const elements = document.getElementsByClassName(style.questionContainer);
      console.log(elements);
      for (let i = 0; i < elements.length; i++) {
        const _element = elements[i];
        if (_element.getBoundingClientRect().top <= touchLocation.clientY && _element.getBoundingClientRect().bottom >= touchLocation.clientY) {
          if (_element.id !== index + "") {
            swapQuestions(_element.id, index)
            console.log(_element.id, index)
          }
        }
      }
    }

    console.log(scrollUpInterval)

  }

  const touchCancel = (e) => {
    if (editing) {
      let touchLocation = e.changedTouches[0];
      // console.log(touchLocation);

      const elements = document.getElementsByClassName(style.questionContainer);
      console.log(elements);
      for (let i = 0; i < elements.length; i++) {
        const _element = elements[i];
        if (_element.getBoundingClientRect().top <= touchLocation.clientY && _element.getBoundingClientRect().bottom >= touchLocation.clientY) {
          if (_element.id !== index + "") {
            swapQuestions(_element.id, index)
            console.log(_element.id, index)
          }
        }
      }
    }

    console.log(scrollUpInterval)
  }


  const deleteQuestion = () => {
    console.log("delete");
    updateQuestions(index, "delete");
  }


  return (
    <div className={style.questionContainer} id={index}
        draggable={editing}
        onDrop={(e) => drop(e)}
        onDragStart={(e) => startDrag(e, index)}
        onDragOver={(e) => allowDrop(e)}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={(e) => touchEnd(e)}
        >
      <div className={style.questionHead} >
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <Dropdown title={null} options={questionTypeOptions} actions={questionTypeActions} />
      </div>
      { type === "mcq" && <MCQ options={options} deleteOption={deleteOption} changeOption={changeOption} addOption={addOption} /> }
      { type === "oe" && <OE/> }
      <button className={style.deleteQuestionBtn} onClick={deleteQuestion} ><MdOutlineDelete /></button>
    </div>
  )
}

export default EditSurveyQuestions;