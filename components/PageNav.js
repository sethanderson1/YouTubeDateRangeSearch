import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Form as MaterialForm,
} from '@material-ui/core'
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

    .MuiButton-root {
        font-size: 1.2rem;
        /* font-size: 2.875rem; */
    }
`

const StyledButton = styled(Button)`
   /* && {
    display: ${props => props.displayNone ? 'none' : null};
   }  */
`






// TODO: prevent double click of next. maybe disable next while loading

// TODO: when press back and go from /2 to /1, use the 1, ie the route.query.pagenum
// to update state accordingly. otherwise browser navigation doesn't work.
export const PageNav = ({ executeScroll, pagenum }) => {
    console.log('pagenum', pagenum)
    console.log('%cPageNav renders', 'color:green')

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
        testPageNum,
    } = context;

    const handleSetTokens = (prevPageToken, nextPageToken) => {
        console.log('handleSetTokens ran')
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
            console.log('%c res from cache', 'font-size:30px')
            res = itemsCache[pageNum + 1]
            console.log('res', res)
        } else {
            // res= await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
            res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
            if (res.items.length) {
                setItemsCache(prev => ({ ...prev, [pageNum]: res }))
            }
        }

        let secondNextPageToken = res.nextPageToken

        console.log('pageNum', pageNum)
        if (itemsCache[pageNum + 2]) {
            console.log('%c resDataSecondFetch from cache', 'font-size:30px')
            resDataSecondFetch = itemsCache[pageNum + 2]
        } else {
            // resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
            resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
            if (resDataSecondFetch.items.length) {
                setItemsCache(prev => ({ ...prev, [pageNum + 2]: resDataSecondFetch }))
            }
        }

        return { res, resDataSecondFetch }
    }

    const handleClickNext = async (token, i) => {
        // console.log('%c handleClickNext ran', 'color:orange')
        // console.log('curPage in handleClickNext', state.curPage)

        if (state.curPage < state.pageTokens.length - 1) {
            const i = state.curPage
            const token = state.pageTokens[i]
            handleClickPageNum(token, i)
        } else {
            const { res, resDataSecondFetch } = await fetchTwice(state.curPage)
            // console.log('res in handleClickNext', res)
            if (!resDataSecondFetch.nextPageToken) {
                setLastPage(state.curPage + 1)
                dispatch({ type: 'CLICK_NEXT', curPage: state.curPage + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            } else {
                // console.log('state.pageTokens', state.pageTokens)
                dispatch({ type: 'CLICK_NEXT', curPage: state.curPage + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            }
            // console.log('res in handleClickNext', res)
            setRes(res)
            executeScroll();
        }

    }

    const handleClickPrev = async () => {
        const res = itemsCache[curPage - 1]
        dispatch({ type: 'CLICK_PREV', curPage: state.curPage - 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })

        setRes(res);
        executeScroll();
    }

    const handleClickPageNum = async (token, i) => {
        // console.log('i + 1 in pagenum', i + 1)
        // console.log('pageTokens.length', pageTokens.length)
        if (i + 1 === state.pageTokens.length) {
            const { res, resDataSecondFetch } = await fetchTwice(i)
            console.log('res in handleClickNext', res)
            if (!resDataSecondFetch.nextPageToken) {
                setLastPage(state.curPage + 1)
                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            } else {
                console.log('state.pageTokens', state.pageTokens)
                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            }
            setRes(res)
        } else {
            const res = itemsCache[i + 1]
            dispatch({ type: 'CLICK_PAGENUM', curPage: i + 1 })
            setRes(res);
        }
        executeScroll();
        // setRes(response);
        // executeScroll();
    }

    useEffect(() => {
        console.log('useEffect in PageNav ran')
        if (Object.keys(res).length !== 0) {
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
        console.log(`%c testPageNum: ${testPageNum}`, 'font-size:30px')
        dispatch({ type: 'CLICK_PAGENUM', curPage: testPageNum })
        let newRes = itemsCache[testPageNum]
        if (newRes) {
            console.log('newRes', newRes)
            setRes(newRes)
        }
    }, [testPageNum])

    function scrap() {
        return (
            // <Link key={i} as={`${i + 1}`} href="/[pagenum]">

            {/* {isDisplayNone(i, state.curPage, state.pageTokens, lastPage)
                    ? <StyledButton
                        style={{ display: "none" }}>
                    </StyledButton>
                    : <StyledButton
                        onClick={() => handleClickPageNum(token, i)}
                        disabled={isCurrentPage(token, i, state.curPage)}>
                        {i + 1}
                    </StyledButton>} */}

            // </Link>
        )
    }

    const renderPageNums = () => {
        return state.pageTokens.map((token, i) => {
            return (
                <>
                    { isDisplayNone(i, state.curPage, state.pageTokens, lastPage)
                        ? <StyledButton
                            style={{ display: "none" }}>
                        </StyledButton>
                        : <StyledButton
                            onClick={() => handleClickPageNum(token, i)}
                            disabled={isCurrentPage(token, i, state.curPage)}>
                            {i + 1}
                        </StyledButton>
                    }
                </>
            )
        })
    }

    const renderNav = () => {
        if (hasSearched) {
            return (
                <NavWrapOuter>
                    <NavWrapInner>
                        <Button
                            onClick={() => handleClickPrev()}
                            disabled={state.curPage === 1 ? true : false} >Prev</Button>
                        {renderPageNums()}
                        <Button onClick={() => handleClickNext()} disabled={state.curPage === lastPage ? true : false}>Next</Button>
                    </NavWrapInner>
                </NavWrapOuter>
            )
        } else {
            return null;
        }
    }
    return renderNav();
}