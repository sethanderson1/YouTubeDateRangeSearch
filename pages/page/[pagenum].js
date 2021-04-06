import { useRouter } from 'next/router';
import React, { useContext, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardList } from '../../components/CardList';
import { Form } from '../../components/Form';
import { PageNav } from '../../components/PageNav';
import { FormContext } from '../../context/FormContext'

const ResOuterWrap = styled.div`
    width: 100%;
    /* margin-top: 40px; */
`

const Heading = styled.div`
    display:flex;
    justify-content:center;
    margin: 0px 20px 30px 20px;
    text-align:center;
`

const H1 = styled.h1`
font-weight: 100;
/* color: ${theme}; */
color: gray;
`

// TODO: upon browser back navigation, hide cardlist right before 
// page transitions. Next router should have a method to do this.
// Look into routeChangeStart on https://nextjs.org/docs/api-reference/next/router 

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
        const handleRouteChange = (url, { shallow }) => {
            setShouldDisplay(false)
            console.log(
                `%c App is changing to ${url} ${shallow ? 'with' : 'without'
                } shallow routing`, 'font-size:30px'
            )
        }

        router.events.on('routeChangeStart', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])


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
            return <CardList visibility={'visible'} />
        } else {
            return <CardList visibility={'hidden'} />
        }

    }

    const renderResults = () => {
        if (didMount) {

            return (
                <ResOuterWrap>
                    <Heading>
                        <a href="https://gracious-leakey-87c1dd.netlify.app/">
                            <H1>YouTube Date Range Search</H1>
                        </a>
                    </Heading>
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