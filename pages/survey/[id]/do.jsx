import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import DoSurveyQuestion from '../../../components/Do/DoSurveyQuestion';
import useDB from '../../../components/Hooks/useDB';

import surveyStyle from '../../../styles/Survey.module.css'
import style from '../../../styles/DoSurvey.module.css'

const DoPage = () => {
    const [survey, setSurvey] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const { connected } = useDB();

    const [highlightedQuestions, setHightlightedQuestions] = useState([]);

    const getSurvey = async () => {
        console.log(id);
        console.log(sessionStorage.getItem("userID"))
        await axios.post("/api/survey/" + id).then( (res) => {
          console.log(res);
          setSurvey(res.data.survey);
        })
    }

    useEffect(() => {
        if (!connected) return;
        getSurvey();
    }, [connected])

    const submit = async () => {
        let questionsList = survey.questions.map( q => q._id);
        const formData = new FormData(document.querySelector('form'));
        let data = {};
        for (var [questionID, answer] of formData.entries()) {
            questionsList.splice(questionsList[questionID], 1);
            console.log(questionID + ":" + answer);
            data[questionID] = answer;
        }
        if (questionsList.length == 0) {
            console.log("filled");
            await axios.post(`/api/survey/${id}/do`, {data, id}).then(res => {
                console.log(res);
                if (res.status === 200) {
                    router.push("/survey/" + id + "/end");
                }
            })
        } else {
            console.log("unfilled");
            setHightlightedQuestions([...questionsList]);
        }
    }

  return (
    <div className={surveyStyle.container}>
        { survey &&
        <div className={style.info} >
            <h1>{survey.title}</h1>
            <p>{survey.description}</p>
        </div> }
        <form>
            <div className={surveyStyle.questionsList}>
            { survey && survey.questions.map( (q, i) => (
                <DoSurveyQuestion key={i} q={q} highlightedQuestions={highlightedQuestions} setHightlightedQuestions={setHightlightedQuestions} />
            ))}
            </div>
        </form>
        <button className={style.submitBtn} onClick={submit}>Submit</button>
    </div>
  )
}

export default DoPage