import '../styles/globals.css'
import useDB from '../components/Hooks/useDB'

function MyApp({ Component, pageProps }) {
    const { connected } = useDB();

  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      { connected &&
        <Component {...pageProps} />
      }
    </div>
  )
}

export default MyApp
