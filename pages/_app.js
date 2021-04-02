import '../styles/globals.css'
import { FormContextProvider } from '../context/FormContext'

function MyApp({ Component, pageProps }) {
  return (
    <FormContextProvider>
      <Component {...pageProps} />
    </FormContextProvider>
  )
}

export default MyApp
