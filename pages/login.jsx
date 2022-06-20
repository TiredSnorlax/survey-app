import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import jwtDecode from 'jwt-decode';

const LoginPage = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const containerStyle = {
        background: "var(--dark-yellow)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",

        padding: "5rem 0",

    }

    const menuStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: "white",
        borderRadius: "1rem",
    }

    const titleContainer = {
        position: "relative",
        transform: "translateX(-20%)",
        marginBottom: "3rem",
        userSelect: "none"
    }

    const titleStyle = {
        fontSize: "5rem",
        fontFamily: "'Sacramento', cursive"
    }

    const subtextStyle = {
        position: "absolute",
        fontSize: "2rem",
        fontFamily: "'Baloo 2', cursive",
        bottom: "-0.5rem",
        right: "-3rem",
    }

    const handleCallbackResponse = (response) => {
         const responsePayload = jwtDecode(response.credential);

         console.log(responsePayload);
         setUser({...responsePayload});
    }


    useEffect(() => {
        if (window.sessionStorage.getItem("user")) {
            console.log("logged in alr");
            router.push("./")
        } else {
            /* global google */
            console.log(process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_ID)
            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_ID,
                callback: handleCallbackResponse,
            })

            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large"}
            )
        }


    }, [])

    useEffect(() => {
        if (user !== null) {
            console.log("sign in successful");
            window.sessionStorage.setItem("user", JSON.stringify(user));
            router.push("./");
        }
    }, [user])



  return (
    <div style={containerStyle}>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Baloo+2&family=Sacramento&display=swap" rel="stylesheet"></link>
        </Head>
        <div style={titleContainer}>
            <p style={titleStyle}>Foogle</p>
            <p style={subtextStyle}>Gorms</p>
        </div>
        <div style={menuStyle} >
            <h1>Sign In</h1>
            <div id='signInDiv'></div>
        </div>
    </div>
  )
}

export default LoginPage