import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import styles from '../../styles/components/LoadingScreen.module.css'

const LoadingScreen = () => {
  return (
    <div className={`${styles.container}`} >
        <div className={styles.content} >
            <h1>Loading...</h1>
            <div><AiOutlineLoading3Quarters /></div>
        </div>
    </div>
  )
}

export default LoadingScreen