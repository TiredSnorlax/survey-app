import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
