import axios from 'axios';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import HomeSurveyItem from '../components/HomeSurveyItem';
import LoadingScreen from '../components/Miscellaneous/LoadingScreen';

import { MdAdd } from 'react-icons/md'

import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const [surveys, setSurveys]  = useState([]);
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIfLoggedIn = async () => {
    const _user = window.sessionStorage.getItem("user");
    if (!_user) {
      router.push("./login");
    } else {
      setUser(JSON.parse(_user));
    }
  }

  const logout = () => {
    sessionStorage.clear();
    router.push("./login");
  }


  const getDb = async () => {
    axios.post('/api/getdb', {
        u: user,
    }).then( (res) => {
      console.log(res);
      sessionStorage.setItem("userID", res.data.user._id);
      setSurveys(res.data.user.surveys);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }).catch( (err) => console.log(err))
  }

  const createNewSurvey = async () => {
      await axios.post('/api/survey/new', {
          email: user.email,
      }).then( (res) => {
          console.log(res);
          router.push(`/survey/${res.data.survey._id}/edit`)
      }).catch( (err) => {
          console.log(err.message);
      })
  }

  const editClick = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, [])

  useEffect(() => {
    if (!user) return
    getDb();
  }, [user])



  return (
    <div className={styles.container}>
      <h1>Surveys</h1>
      { user &&
        <Profile user={user} logout={logout} />
      }
      <button className={`${styles.editBtn} ${editing ? styles.active : ""}`} onClick={editClick}>{editing ? "Save" : "Edit"}</button>
      <div className={styles.surveyContainer} >
        { surveys.map( (survey, i) => (
          <HomeSurveyItem survey={survey} setSurveys={setSurveys} editing={editing} i={i} key={i}  />
        ))}
      <div className={styles.newSurveyBtn} onClick={createNewSurvey} ><span><MdAdd /></span><p>New Survey</p></div>
      </div>
      { loading &&
        <LoadingScreen />
      }
    </div>
  )
}


const Profile = ({ user, logout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.profileContainer}>
        <div className={styles.profile} onClick={() => setOpen(!open)} >
          <Image src={user.picture.toString()} width="30px" height="30px" />
          <p>{user.name}</p>
        </div>
        <div className={`${styles.logoutBtn} ${open && styles.open}`} onClick={logout} >
          <p>Logout</p>
        </div>
    </div>
  )
}