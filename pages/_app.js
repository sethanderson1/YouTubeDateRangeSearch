import { FormContextProvider } from '../context/FormContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <FormContextProvider>
      <Component {...pageProps} />
    </FormContextProvider>
  )
}

export default MyApp
