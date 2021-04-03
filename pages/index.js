import { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import { Form } from '../components/Form'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { Results } from '../components/Results'
import { FormContextProvider } from '../context/FormContext'
import { FormContext } from '../context/FormContext';
import { VideoBackground } from '../components/VideoBackground'
// import { Route } from 'react-router';
// import { StaticRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import Example from './[example]/[example]'
const history = createMemoryHistory();
// const history = createBrowserHistory();
import Link from 'next/link'


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

const theme = 'white';

const H1 = styled.h1`
  font-weight: 100;
  /* color: ${theme}; */
  color: gray;
`

export default function Home() {
  console.log('%cHome renders', 'color:green')
  // fetch('https://l8o8ahwhyf.execute-api.us-west-1.amazonaws.com/live/item/')

  return (
    <>
      <Head>
        <title>YouTube Date Range Search asdf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <FormContextProvider> */}
      {/* <VideoBackground /> */}
      <main>
        <Heading>
          <a href="https://gracious-leakey-87c1dd.netlify.app/">
            <H1>YouTube Date Range Search</H1>
          </a>
        </Heading>
        <Form />
        {/* <Router history={history}>
            <Route path={'/'} exact render={(props) => (<Results />)} /> */}
        {/* <Example /> */}
        {/* <Link as="page/pagenum" href="/[eg]/[example]">
          <a>Click here</a>
        </Link> */}
        {/* <Results /> */}
        {/* </Router> */}
      </main>
      {/* </FormContextProvider> */}
    </>
  )
}


