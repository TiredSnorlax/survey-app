import surveyStyle from '../../../styles/Survey.module.css'


const EndPage = () => {
    const imgStyle = {
        background: "none",
        width: "auto",
        maxWidth: "80vw",
    }


    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        fontSize: "1.5rem",
    }
  return (
    <div className={surveyStyle.container} style={containerStyle} >
        <img style={imgStyle} src={"/thankyou.png"} alt=""/>
        <p>for your response!</p>
        <img src={"/cuteimg.png"} alt="" style={imgStyle} />
    </div>

  )
}

export default EndPage