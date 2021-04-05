import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Form as MaterialForm,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
import fetchData from '../utils/fetchData';
import fetchDataDummy from '../utils/fetchDataDummy';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { isDisplayNone, isCurrentPage, tokenAlreadyExists } from '../utils/pageNavFunctions';


const NavWrapOuter = styled.div`
    /* width:500px; */
    display:flex;
    justify-content:center;

    .MuiButton-root {
        min-width:20px;
    }
`

const NavWrapInner = styled.div`
    width: 500px;
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    margin-bottom: 80px;

    .MuiButton-root {
        /* font-size: 1.2rem; */
        font-size: 1.3rem;
        /* font-size: 2.875rem; */
    }

    .MuiSvgIcon-root {
        font-size:2.5rem;
    }
`

const StyledButton = styled(Button)`
   /* && {
    display: ${props => props.displayNone ? 'none' : null};
   }  */
`






// TODO: prevent double click of next. maybe disable next while loading

//handle 403 response

export const PageNav = ({ executeScroll, pagenum }) => {
    console.log('%cPageNav renders', 'color:green')
    console.log('pagenum in PageNav', pagenum)

    const router = useRouter()

    const context = useContext(FormContext);
    const {
        query,
        maxResults,
        sortOption,
        start,
        end,
        res,
        setRes,
        pageTokens,
        curPage,
        hasSearched,
        lastPage,
        setLastPage,
        state,
        dispatch,
        itemsCache,
        setItemsCache,
        urlPageNum,
        shouldDisplay,
        setShouldDisplay
    } = context;

    console.log('curPage', curPage)


    const handleSetTokens = (prevPageToken, nextPageToken) => {
        console.log('prevPageToken', prevPageToken)
        console.log('nextPageToken', nextPageToken)
        // console.log('handleSetTokens ran')
        // if we're at the first fetch, we should end up with
        // ['DUMMY', SOMETOKEN]
        if (pageTokens[0] === 'DUMMY' && pageTokens.length === 1) {
            dispatch({ type: 'CLICK_SEARCH', curPage: state.curPage, pageTokens: { prevPageToken, nextPageToken } })
        }
        if (pageTokens[0] !== 'DUMMY') {

            dispatch({ type: 'CLICK_NEXT', curPage: state.curPage, pageTokens: { prevPageToken, nextPageToken } })
        }
    }

    const fetchTwice = async (pageNum) => {
        const nextPageToken = pageTokens[pageNum]
        let res, resDataSecondFetch
        console.log('pageNum', pageNum)

        if (itemsCache[pageNum + 1]) {
            // console.log('%c res from cache', 'font-size:30px')
            res = itemsCache[pageNum + 1]
            // console.log('res', res)
        } else {
            res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
            // res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
            console.log('res in fetch twice', res)
            if (res.items.length) {
                setItemsCache(prev => ({ ...prev, [pageNum]: res }))
            }
        }

        let secondNextPageToken = res.nextPageToken

        // console.log('pageNum', pageNum)
        if (itemsCache[pageNum + 2]) {
            // console.log('%c resDataSecondFetch from cache', 'font-size:30px')
            resDataSecondFetch = itemsCache[pageNum + 2]
        } else {
            resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
            // resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
            if (resDataSecondFetch.items.length) {
                setItemsCache(prev => ({ ...prev, [pageNum + 2]: resDataSecondFetch }))
            }
        }

        return { res, resDataSecondFetch }
    }


    const handlePageNavClick = async (token, i) => {
        console.log('i + 1 in pagenum', i + 1)
        // console.log('pageTokens.length', pageTokens.length)
        console.log('curPage', curPage)

        if (i + 1 === state.pageTokens.length) {
            const { res, resDataSecondFetch } = await fetchTwice(i)
            // console.log('res in handleClickNext', res)
            if (!resDataSecondFetch.nextPageToken) {
                setLastPage(state.curPage + 1)

                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            } else {
                // console.log('state.pageTokens', state.pageTokens)
                console.log('not last page')
                // need to not call this just on initial run
                if (i + 1 === 1) {

                } else {
                    dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
                }
                // dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })

            }
            // debugger

            setRes(res)
        } else {
            const res = itemsCache[i + 1]
            dispatch({ type: 'CLICK_PAGENUM', curPage: i + 1 })
            setRes(res);
        }


        // executeScroll();s
    }

    useEffect(() => {
        console.log('useEffect in PageNav ran')
        if (res !== undefined && Object.keys(res).length !== 0) {
            const nextPageToken = res?.nextPageToken;
            // console.log('nextPageToken', nextPageToken)
            const prevPageToken = res?.prevPageToken;
            // if coming from next
            if (lastPage === state.curPage + 1) {
            } else {
                if (!tokenAlreadyExists(nextPageToken, state.pageTokens)) {
                    // console.log('nextPageToken', nextPageToken)
                    handleSetTokens(prevPageToken, nextPageToken)
                }
            }
        }
    }, [res])

    useEffect(() => {
        console.log(`%c urlPageNum: ${urlPageNum}`, 'font-size:30px')
        // dispatch({ type: 'CLICK_PAGENUM', curPage: urlPageNum })
        console.log('urlPageNum is', urlPageNum)
        handlePageNavClick('_', urlPageNum - 1)
    }, [urlPageNum])



    const renderPageNums = () => {
        return state.pageTokens.map((token, i) => {
            return (
                <Link key={i} as={`${i + 1}`} href="/page/[pagenum]">
                    {/* <Link key={i} as={`${i + 1}`} href="/[pagenum]"> */}
                    { isDisplayNone(i, state.curPage, state.pageTokens, lastPage)
                        ? <StyledButton
                            style={{ display: "none" }}>
                        </StyledButton>
                        : <StyledButton
                            onClick={() => setShouldDisplay(false)}
                            disabled={isCurrentPage(token, i, state.curPage)}>
                            {i + 1}
                        </StyledButton>
                    }
                </Link>
            )
        })
    }

    const renderNav = () => {
        if (hasSearched && shouldDisplay) {
            return (
                <NavWrapOuter>
                    <NavWrapInner>
                        <Link as={`${state.curPage - 1}`} href="/page/[pagenum]">

                            <Button
                                onClick={() => setShouldDisplay(false)}
                                disabled={state.curPage === 1 ? true : false} ><ChevronLeftIcon /></Button>
                        </Link>
                        {renderPageNums()}
                        <Link as={`${state.curPage + 1}`} href="/page/[pagenum]">
                            <Button
                                onClick={() => setShouldDisplay(false)}
                                disabled={state.curPage === lastPage ? true : false}>
                                <ChevronRightIcon />
                            </Button>
                        </Link>

                    </NavWrapInner>
                </NavWrapOuter>
            )
        } else {
            return null;
        }
    }
    return renderNav();
}