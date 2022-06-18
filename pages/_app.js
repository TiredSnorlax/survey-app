import '../styles/globals.css'
import useDB from '../components/Hooks/useDB'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    const { connected } = useDB();

  return (
    <div>
      <Head>
        <title>Foogle Gorms</title>
        <link rel="icon" href="/icon.svg"></link>
      </Head>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      { connected &&
        <Component {...pageProps} />
      }
    </div>
  )
}

export default MyApp
