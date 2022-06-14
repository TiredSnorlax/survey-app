import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { MdHome } from 'react-icons/md'

import EditSurveyQuestions from '../../../components/Edit/EditSurveyQuestions'
import LoadingScreen from '../../../components/Miscellaneous/LoadingScreen'

import style from '../../../styles/Survey.module.css'
import PublishMenu from '../../../components/Edit/PublishMenu'

const SurveyId = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);

    const [survey, setSurvey] = useState(null);
    const [questions, setQuestions] = useState([]);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const [editing, setEditing] = useState(false);
    const [drag, setDrag] = useState(null);
    const [usingTouch, setUsingTouch] = useState(false);
    var resizeTimeout;

    const [updateAllQs, setUpdateAllQs] = useState(false);

    const [publishMenuOpen, setPublishMenuOpen] = useState(false);

    const containerRef = useRef(null);

    // Signal to all questions to update themselves
    const updateAllQuestions = () => {
      setUpdateAllQs(true);
      setTimeout(() => {
        setUpdateAllQs(false);
      }, 500);
    }

    const updateQuestions = (index, content) => {
      let _questions = questions;
      if (content === "delete") {
        _questions.splice(index, 1);
      } else {
        _questions[index] = content;
      }
      setQuestions([..._questions]);
      console.log("update");
    }


    const getSurvey = async () => {
        await axios.post("/api/survey/" + id, {
            userID: window.sessionStorage.getItem("userID") , purpose: "edit"
        }
        ).then( (res) => {
          console.log(res);
          setSurvey(res.data.survey);
          setLoading(false);
        }).catch( (err) => {
          if (err.message === "Request failed with status code 401") {
            router.push("/")
          }
        })
    }

    const swapQuestions = (indexOne, indexTwo) => {
      console.log("swap questions")
      updateAllQuestions();
      setTimeout(() => {
        const _temp = questions[indexOne];
        let _questions = questions;
        _questions[indexOne] = questions[indexTwo];
        _questions[indexTwo] = _temp;
        setQuestions([..._questions]);
        setDrag(null);
      }, 100);
    }

    const addNewQuestion = () => {
      const _questions = questions;
      _questions.push(
        {
          content: "New Question",
          isMCQ: true,
          options: [],
          responses: [],
        }
      );

      setQuestions([..._questions])
    }

    const editClick = () => {
      const bodyRef = document.querySelector("body");
      if (editing) {
        setEditing(false);
        if (usingTouch) bodyRef.style.overflowY = "scroll";
      } else {
        setEditing(true);
        if (usingTouch) bodyRef.style.overflowY = "hidden";
      }
    }

    const sendToAPI = async () => {
      await axios.post(`/api/survey/${id}/edit`, {
        content: {newTitle, newDescription},
        questions,
      }).then( (res) => {
        console.log(res);
        setSurvey({...res.data.survey});
        setLoading(false);
      })
    }

    const saveSurvey = () => {
      setLoading(true);
      updateAllQuestions();
      setTimeout(() => {
        sendToAPI();
      }, 100);
    }

    const viewResults = () => {
      router.push(`${window.location.origin}/survey/${id}/results`);
    }

    useEffect(() => {
        if (!id) return;
        getSurvey();
    }, [id])

    useEffect(() => {
      if (!survey) return;
      setNewTitle(survey.title);
      setNewDescription(survey.description);
      setQuestions([...survey.questions]);
    }, [survey])

    useEffect(() => {
      if (window.innerWidth <= 500) {
        setUsingTouch(true);
      }
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          console.log(window.innerWidth);
          if (window.innerWidth <= 500) {
            console.log("on mobile");
            setUsingTouch(true);
          } else {
            setUsingTouch(false);
          }
        }, 100);
      })


    }, [])



  return (
    <div className={style.container} ref={containerRef} >
      <div className={style.info} >
        <input className={style.titleInput} type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <input className={style.descriptionInput} type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <div className={style.side} >
          <div className={style.homeBtn} onClick={() => router.push("/")} ><MdHome /></div>
          <button className={style.resultsBtn} onClick={viewResults} >View Results</button>
          <button className={style.publishBtn} onClick={() => setPublishMenuOpen(true)} >Publish</button>
        </div>
      </div>
      <div className={style.questionsList} >
        <h2>Questions</h2>
        { questions && questions.map( (q, i) => (
          <EditSurveyQuestions key={i} q={q} editing={editing} usingTouch={usingTouch} index={i} drag={drag} setDrag={setDrag} swapQuestions={swapQuestions} updateQuestions={updateQuestions} updateAllQs={updateAllQs} />
        ))}
        <button className={style.newQuestionBtn} onClick={addNewQuestion} >Add Question</button>
      </div>
        <button className={`${style.saveBtn} ${style.fixedBtns}`} onClick={saveSurvey} >Save</button>
        <button className={`${style.editBtn} ${style.fixedBtns}`} onClick={editClick} >{editing ? "Editing" : "Edit"}</button>
      { publishMenuOpen && <PublishMenu id={id} setPublishMenuOpen={setPublishMenuOpen} /> }
      { loading && <LoadingScreen />}
    </div>
  )
}

export default SurveyId
