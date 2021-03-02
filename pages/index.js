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

// const Video = styled.video`
//     position:fixed;
//     z-index: -1;
//     filter:brightness(30%);
//     height: 100%;
//     @media screen and (min-width: 480px) {
//       width: 100%;
//     }
//     `

export default function Home() {
  console.log('%cHome renders', 'color:green')

  const theme = 'white';

  const H1 = styled.h1`
    font-weight: 100;
    /* color: ${theme}; */
    color: gray;
`

  return (
    <>
      <Head>
        <title>YouTube Date Range Search asdf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormContextProvider>
        <VideoBackground />
        <main>
          <Heading>
            <a href="https://gracious-leakey-87c1dd.netlify.app/">
              <H1>YouTube Date Range Search</H1>
            </a>
          </Heading>
          <Form />
          <Results />
        </main>
      </FormContextProvider>
    </>
  )
}


