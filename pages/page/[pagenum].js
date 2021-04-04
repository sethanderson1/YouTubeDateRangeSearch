import { useRouter } from 'next/router';
import React, { useContext, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardList } from '../../components/CardList';
import { Form } from '../../components/Form';
import { PageNav } from '../../components/PageNav';
import { FormContext } from '../../context/FormContext'

const ResOuterWrap = styled.div`
    width: 100%;
    margin-top: 40px;
`

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Results() {
    console.log('%c [pagenum] renders', 'color:green')
    const [didMount, setDidMount] = useState(false)
    // const [shouldDisplay, setShouldDisplay] = useState(true)
    const context = useContext(FormContext)
    const {
        urlPageNum,
        setUrlPageNum,
        state,
        dispatch,
        shouldDisplay,
        setShouldDisplay,
        res,
        curPage
    } = context

    const router = useRouter()
    console.log('urlPageNum', urlPageNum)

    const pagenum = router.query.pagenum

    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);

    useEffect(() => {
        console.log('useEffect in [pagenum] renders')
        console.log('didMount', didMount)
        // dispatch({ type: 'RESET' })
        setDidMount(true)
    }, [didMount])

    useEffect(() => {
        console.log('router.query.pagenum', router.query.pagenum)

        setUrlPageNum(pagenum)
    })

    useEffect(() => {
        console.log('curPage', curPage)
        setShouldDisplay(true)
    }, [curPage])



    const renderCardList = () => {
        // debugger
        if (shouldDisplay) {
            return (
                <>
                    <CardList />
                </>
            )
        } else {
            return null
        }
    }

    const renderResults = () => {
        if (didMount) {

            return (
                <ResOuterWrap>
                    <Form />
                    <div ref={myRef}></div>
                    {renderCardList()}
                    <PageNav executeScroll={executeScroll} pagenum={pagenum} />
                </ResOuterWrap>
            )
        } else {
            return null
        }
    }

    return renderResults()
}