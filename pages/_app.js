import { useEffect, useState } from 'react'
import { FormContextProvider } from '../context/FormContext'
import { useRouter } from 'next/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {

  //     console.log(
  //       `%c App is changing to ${url} ${shallow ? 'with' : 'without'
  //       } shallow routing`, 'font-size:30px'
  //     )
  //   }

  //   router.events.on('routeChangeStart', handleRouteChange)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [])

  return (
    <FormContextProvider>
      <Component {...pageProps} />
    </FormContextProvider>
  )
}

export default MyApp
