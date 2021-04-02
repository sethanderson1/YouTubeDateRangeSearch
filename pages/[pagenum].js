import { useRouter } from 'next/router';
import React, { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { CardList } from '../components/CardList';
import { PageNav } from '../components/PageNav';
import { FormContext } from '../context/FormContext'


const ResOuterWrap = styled.div`
    width: 100%;
    margin-top: 40px;
`

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Results() {
    console.log('%c [pagenum] renders', 'color:green')

    const context = useContext(FormContext)
    const {
        testPageNum,
        setTestPageNum
    } = context

    const router = useRouter()
    console.log('testPageNum', testPageNum)

    const pagenum = router.query.pagenum

    useEffect(() => {
        console.log('router.query.pagenum', router.query.pagenum)

        setTestPageNum(pagenum)
    })



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