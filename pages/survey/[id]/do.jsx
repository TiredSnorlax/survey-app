import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import DoSurveyQuestion from '../../../components/Do/DoSurveyQuestion';
import LoadingScreen from '../../../components/Miscellaneous/LoadingScreen';

import surveyStyle from '../../../styles/Survey.module.css'
import style from '../../../styles/DoSurvey.module.css'

const DoPage = () => {
    const [survey, setSurvey] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);

    const [highlightedQuestions, setHightlightedQuestions] = useState([]);

    const getSurvey = async () => {
        console.log(id);
        console.log(sessionStorage.getItem("userID"))
        await axios.post("/api/survey/" + id).then( (res) => {
          console.log(res);
          setSurvey(res.data.survey);
          setLoading(false);
        })
    }

    useEffect(() => {
        if (!id) return;
        getSurvey();
    }, [id])

    const submit = async () => {
        let questionsList = survey.questions.map( q => q._id);
        let unfilledQuestions = [];
        const formData = new FormData(document.querySelector('form'));
        let data = {};

        for (var [questionID, answer] of formData.entries()) {
            if (answer && answer.length > 0) {
                data[questionID] = answer;
            }
        }

        for (let i = 0; i < questionsList.length; i++) {
            if (!Object.keys(data).includes(questionsList[i])) {
                unfilledQuestions.push(questionsList[i]);
            }
        }

        if (unfilledQuestions.length == 0) {
            console.log("filled");
            setHightlightedQuestions([]);
            await axios.post(`/api/survey/${id}/do`, {data, id}).then(res => {
                console.log(res);
                if (res.status === 200) {
                    router.push("/survey/" + id + "/end");
                }
            })
        } else {
            console.log("unfilled");
            setHightlightedQuestions([...unfilledQuestions]);
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
        { loading && <LoadingScreen /> }
    </div>
  )
}

export default DoPage