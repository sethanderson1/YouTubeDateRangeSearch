import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { CardList } from '../components/CardList';
import { PageNav } from '../components/PageNav';
import { FormContext } from '../context/FormContext'


const ResOuterWrap = styled.div`
    width: 100%;
    /* margin: 0 auto; */
    margin-top: 40px;
`

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Results() {

    const context = useContext(FormContext)
    const {
        testPageNum,
        setTextPageNum
    } = context

    const router = useRouter()
    console.log('router in Results', router)
    console.log('router.query.pagenum', router.query.pagenum)

    const pagenum = router.query.pagenum

    setTextPageNum(pagenum)


    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);
    return (
        <ResOuterWrap>
            <div ref={myRef}></div>
            <CardList />
            <PageNav executeScroll={executeScroll} pagenum={pagenum} />
        </ResOuterWrap>
    )
}