import React from 'react'
import styles from '../../../styles/Results.module.css'

const OE = ({ data }) => {
  return (
    <>
      { data.length > 0 ?
        <div className={styles.OEResponsesList} >
          { data.map( (d, i) => (
            <React.Fragment key={i}>
              <p>{i + 1}.</p>
              <p>{d}</p>
            </React.Fragment>
          ) )}
        </div>
      :
        <p>No responses yet...</p>
      }
    </>
  )
}

export default OE