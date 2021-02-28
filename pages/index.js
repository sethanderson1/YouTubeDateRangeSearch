import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import { Form } from '../components/Form'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { Results } from '../components/Results'
import { FormContextProvider } from '../context/FormContext'
import { FormContext } from '../context/FormContext';
import { VideoBackground } from '../components/VideoBackground'


const Heading = styled.div`
    display:flex;
    justify-content:center;
    margin: 0px 20px 30px 20px;
    text-align:center;
    `

const Video = styled.video`
    position:fixed;
    width: 100%;
    z-index: -1;
    filter:brightness(30%);
    `

export default function Home() {
  console.log('%cHome renders', 'color:green')

  const context = useContext(FormContext);
  // const { hasSearched } = context;
  // console.log('hasSearched', hasSearched)
  // const hasSearched = true;



  useEffect(() => {

    console.log('context?.hasSearched', context?.hasSearched)
  }, [context?.hasSearched])

  const theme = 'white';

  const H1 = styled.h1`
    font-weight: 100;
    color: ${theme};
`

  const renderVideo = () => {
    if (!context?.hasSearched) {
      return (<Video autoPlay loop muted id='video' >
        <source src={'/kitten.mp4'} type="video/mp4" />
      </Video>)
    } else {
      null
    }

  }

  return (
    <>
      <Head>
        <title>YouTube Date Range Search asdf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormContextProvider>
        <VideoBackground />
        <main>
          {/* {renderVideo()} */}
          <Heading>
            <H1>YouTube Date Range Search</H1>
          </Heading>
          <Form />
          <Results />
        </main>
      </FormContextProvider>
    </>
  )
}


