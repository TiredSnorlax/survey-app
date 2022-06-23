import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

import axios from 'axios'
import QuestionContainer from '../../../components/Results/QuestionContainer'
import LoadingScreen from '../../../components/Miscellaneous/LoadingScreen'

import surveyStyles from '../../../styles/Survey.module.css'
import styles from '../../../styles/Results.module.css'

import { server } from '../../../components/config'

const ResultsPage = ({ data }) => {
    const router = useRouter();
    const { id } = router.query;
    const [survey, setSurvey] = useState(data);

    // put data and preprocess data into individual question types
    const [processedData, setProcessedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);


    // const getSurvey = async () => {
    //     await axios.post("/api/survey/" + id, {
    //         userID: window.sessionStorage.getItem("userID") , purpose: "edit"
    //     }).then( (res) => {
    //       console.log(res);
    //       setSurvey({...res.data.survey});
    //       setLoading(false);
    //     }).catch( (err) => {
    //       if (err.message === "Request failed with status code 401") {
    //         router.push("/")
    //       }
    //     })
    // }

    const preprocessData = () => {
        const responses = survey.responses;
        const questions = survey.questions;

        if (!questions || questions.length === 0) return;

        const consolidatedResults = {};
        questions.map( q => {
            consolidatedResults[q._id] = [];
        })

       const questionIDs = questions.map( q => q._id);

        for (let j = 0; j < responses.length; j++) {
            for (let i = 0; i < questionIDs.length; i++) {
                const id = questionIDs[i];
                const re = responses[j][id];
                consolidatedResults[id].push(responses[j][id]);
            }
        }

        setProcessedData(consolidatedResults)
        return consolidatedResults;
    }

    const returnEdit = () => {
        setLoading(true);
        router.push("../" + id + "/edit?userID=" + sessionStorage.getItem("userID"));
    }

    // useEffect(() => {
    //     if (!id) return;
    //     getSurvey();

    //   return () => {
    //       setSurvey(null);
    //   }
    // }, [id])

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
        <h1 className={styles.header} >Results</h1>
        <div className={styles.resultsList}>
            { survey && processedData && survey.questions.map( (q, i) => (
                <QuestionContainer key={i} index={i} question={q} data={processedData[q._id]} />
            ))}
        </div>
        <div className={styles.backBtn} onClick={returnEdit} >
            <FaArrowLeft />
        </div>
        { menuOpen && <Menu id={id} setMenuOpen={setMenuOpen} />}
        { loading && <LoadingScreen />}
    </div>
  )
}

export default ResultsPage


const Menu = ({ id, setMenuOpen }) => {
    const [response, setResponse] = useState(null);

    const send = async () => {
        await axios.post("/api/survey/" + id + "/results/clear", {
            userID: window.sessionStorage.getItem("userID") , purpose: "edit"
        }).then( (res) => {
          console.log(res);
          setResponse(res.data.message);
        }).catch( (err) => {
            console.log(err);
            setResponse(err.message)
        })
    }

    const close = () => {
        setMenuOpen(false);
    }

    return (
        <div className={styles.clearMenuContainer} >
            <div className={styles.clearMenu} >
            { !response ?
                <>
                    <h1>Are you sure you want to clear the responses?</h1>
                    <p>Such changes are irreversible</p>
                    <p>Please remember to clear responses after each edit to get more accurate results!</p>
                    <div>
                        <button onClick={() => setMenuOpen(false)}>Cancel</button>
                        <button onClick={send}>Clear</button>
                    </div>
                </>

                :
                <>
                    <h1>{response}</h1>
                    <p>Please refresh your page to see changes!</p>
                    <button onClick={close}>Close</button>
                </>
            }
            </div>
        </div>
    )

}


export async function getServerSideProps(context) {

  const surveyID = context.params.id;
  const userID = context.query.userID;

  let data;

  if (userID) {
      const res = await axios.post(server + "/api/survey/" + surveyID, {
          userID , purpose: "edit"
      })

      data = res.data.survey;
  }


  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { data }
  }
}
