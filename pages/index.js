import Head from 'next/head'
import { Form } from '../components/Form'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { Results } from '../components/Results'

const Heading = styled.div`
    display:flex;
    justify-content:center;
    margin: 20px 20px 30px 20px;
    text-align:center;
`

export default function Home() {
  return (
    <div>
      <Head>
        <title>YouTube Date Range Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>
          <h1>YouTube Date Range Search</h1>
          <p>
            {process.env.NEXT_PUBLIC_TEST}
          </p>
        </Heading>
        <Form />
        <Results />
      </main>
    </div>
  )
}


