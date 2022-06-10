import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

import axios from 'axios'
import GraphContainer from '../../../components/Results/GraphContainer'

import surveyStyles from '../../../styles/Survey.module.css'
import styles from '../../../styles/Results.module.css'

const ResultsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [survey, setSurvey] = useState(null);
    const [data, setData] = useState(null);


    const getSurvey = async () => {
        const _user = JSON.parse(sessionStorage.getItem("user"));
        await axios.post("/api/survey/" + id, {
            userID: window.sessionStorage.getItem("userID") , purpose: "edit"
        }).then( (res) => {
          console.log(res);
          setSurvey(res.data.survey);
        }).catch( (err) => {
          if (err.message === "Request failed with status code 401") {
            router.push("/")
          }
        })
    }

    const preprocessData = () => {
        const responses = survey.responses;
        const questions = survey.questions;

        console.log(questions)

        const consolidatedResults = {};
        questions.map( q => {
            consolidatedResults[q._id] = [];
        })

        console.log(consolidatedResults)

        for (let j = 0; j < responses.length; j++) {
            console.log(responses)
            for (const questionID in responses[j]) {
                let _id = questionID.toString().split(":")[1];
                console.log(questionID.toString().split(":"))
                consolidatedResults[_id].push(responses[j][questionID])
            }
        }
        console.log(consolidatedResults)
        setData(consolidatedResults)
        return consolidatedResults;
    }

    useEffect(() => {
        if (!id) return;
        getSurvey();

      return () => {
          setSurvey(null);
      }
    }, [id])

    useEffect(() => {
        if (!survey) return;
        preprocessData();
    }, [survey])


  return (
    <div className={surveyStyles.container}>
        { survey &&
            <div className={surveyStyles.info}>
                <h1>{survey.title}</h1>
                <p>{ survey.description}</p>
            </div>
        }
        <h1>Results</h1>
        <div className={styles.resultsList}>
            { survey && data && survey.questions.map( (q, i) => (
                <GraphContainer key={i} index={i} question={q} data={data[q._id]} />
            ))}
        </div>
        <div className={styles.backBtn} >
            <FaArrowLeft />
        </div>
    </div>
  )
}

export default ResultsPage