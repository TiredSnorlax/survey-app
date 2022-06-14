import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

import axios from 'axios'
import GraphContainer from '../../../components/Results/GraphContainer'
import LoadingScreen from '../../../components/Miscellaneous/LoadingScreen'

import surveyStyles from '../../../styles/Survey.module.css'
import styles from '../../../styles/Results.module.css'

const ResultsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [survey, setSurvey] = useState(null);
    // put data and preprocess data into individual question types
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);


    const getSurvey = async () => {
        await axios.post("/api/survey/" + id, {
            userID: window.sessionStorage.getItem("userID") , purpose: "edit"
        }).then( (res) => {
          console.log(res);
          setSurvey(res.data.survey);
          setLoading(false);
        }).catch( (err) => {
          if (err.message === "Request failed with status code 401") {
            router.push("/")
          }
        })
    }

    const preprocessData = () => {
        const responses = survey.responses;
        const questions = survey.questions;


        const consolidatedResults = {};
        questions.map( q => {
            consolidatedResults[q._id] = [];
        })


        for (let j = 0; j < responses.length; j++) {
            for (const questionID in responses[j]) {
                consolidatedResults[questionID].push(responses[j][questionID])
            }
        }
        setData(consolidatedResults)
        return consolidatedResults;
    }

    const returnEdit = () => {
        router.push("../" + id + "/edit");
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
        <button className={styles.clearBtn} onClick={() => setMenuOpen(true)}>Clear Results</button>
        <h1>Results</h1>
        <div className={styles.resultsList}>
            { survey && data && survey.questions.map( (q, i) => (
                <GraphContainer key={i} index={i} question={q} data={data[q._id]} />
            ))}
        </div>
        <div className={styles.backBtn} onClick={returnEdit} >
            <FaArrowLeft />
        </div>
        { menuOpen && <Menu id={id} setMenuOpen={setMenuOpen} setSurvey={setSurvey} />}
        { loading && <LoadingScreen />}
    </div>
  )
}

export default ResultsPage


const Menu = ({ id, setMenuOpen, setSurvey }) => {
    const [response, setResponse] = useState(null);

    const send = async () => {
        await axios.post("/api/survey/" + id + "/results/clear", {
            userID: window.sessionStorage.getItem("userID") , purpose: "edit"
        }).then( (res) => {
          console.log(res);
          setResponse(res.data.message);
          setSurvey({...res.data.survey});
        }).catch( (err) => {
            console.log(err);
            setResponse(err.message)
        })
    }

    return (
        <div className={styles.clearMenuContainer} >
            <div className={styles.clearMenu} >
            { !response ?
                <>
                    <h1>Are you sure you want to clear the responses?</h1>
                    <p>Such changes are irreversible</p>
                    <div>
                        <button onClick={() => setMenuOpen(false)}>Cancel</button>
                        <button onClick={send}>Clear</button>
                    </div>
                </>

                :
                <>
                    <h1>Response</h1>
                    <p>{response}</p>
                    <button onClick={() => setMenuOpen(false)}>Close</button>
                </>
            }
            </div>
        </div>
    )

}