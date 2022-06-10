import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
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
        width: "100vw",
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
        <div style={menuStyle} >
            <h1>Sign In</h1>
            <div id='signInDiv'></div>
        </div>
    </div>
  )
}

export default LoginPage