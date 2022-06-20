import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import styles from '../styles/Home.module.css'

const HomeSurveyItem = ({ survey, setSurveys, editing, i }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const click = () => {
    if (!editing) {
      router.push("/survey/" + survey._id + "/edit?" + "userID=" + sessionStorage.getItem("userID"));
    }
  }

  const deleteSurvey = async () => {
    await axios.post(`/api/survey/${survey._id}/delete`, { id: survey._id, userID: sessionStorage.getItem("userID")}).then( res => {
      console.log(res.data);
      setSurveys(res.data.user.surveys)
    });
  }

  return (
    <div key={i} className={styles.surveyItem} onClick={click} >
      <div>
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>
      </div>
      <div></div>
      { editing &&
        <div className={styles.deleteIcon} onClick={() => setMenuOpen(true)}>
          <FaRegTrashAlt />
        </div>
      }
      { menuOpen &&
        <Popup survey={survey} deleteSurvey={deleteSurvey} setMenuOpen={setMenuOpen} />
      }
    </div>
  )
}

export default HomeSurveyItem


const Popup = ({ survey, deleteSurvey, setMenuOpen }) => {

  const click = () => {
    deleteSurvey();
    setMenuOpen(false);
  }

  return (
    <div className={styles.deleteMenuContainer}>
      <div className={styles.deleteMenu} >
        <h2>Delete this survey?</h2>
        <p>{survey.title}</p>
        <div className={styles.buttonContainer} >
          <button onClick={() => setMenuOpen(false)}>Cancel</button>
          <button onClick={click}>Delete</button>
        </div>
      </div>
    </div>
  )
}