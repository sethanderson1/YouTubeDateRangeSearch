import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Form as MaterialForm,
} from '@material-ui/core'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
import fetchData from '../utils/fetchData';
import fetchDataDummy from '../utils/fetchDataDummy';
// import { nanoid } from 'nanoid'

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
    /* visibility: ${props => props.pageNumsHidden ? 'hidden' : 'visible'}; */

    /* margin-top:50px; */
    /* margin-bottom:500px; */
    /* margin-bottom:50px; */
    /* border: 1px solid red; */
    .MuiButton-root {
        font-size: 1.2rem;
        /* font-size: 2.875rem; */

    }

`

const StyledButton = styled(Button)`
   && {
    display: ${props => props.displayNone ? 'none' : null};
    /* display: ${props => props.displayNone ? 'none' : 'inline-flex'}; */
    
    /* font-size: ${props => props.i * 20}px */
    /* font-size: ${props => props.curPage * 20}px */
    /* visibility: hidden; */
   } 
`



// TODO: figure out nav page number flicker upon clicking next
// update: flicker is caused by low page disappearing in re to 
// curPage change, then high page appears. They should ideally 
// happen simultaneously.
// So maybe i can hide entire page numbers until finished transition



// TODO: prevent double click of next. maybe disable next while loading
export const PageNav = ({ executeScroll }) => {
    console.log('%cPageNav renders', 'color:green')
    // const [pageNumsHidden, renderPageNumsHidden] = useState(true)

    const context = useContext(FormContext);
    const {
        query,
        setQuery,
        maxResults,
        setMaxResults,
        sortOption,
        setSortOption,
        start,
        setStart,
        date,
        setDate,
        end,
        setEnd,
        res,
        setRes,
        pageTokens,
        setPageTokens,
        curPage,
        setCurPage,
        hasSearched,
        setHasSearched,
        lastPage,
        setLastPage,
        state,
        dispatch,
        itemsCache,
        setItemsCache
    } = context;
    // console.log('state', state)

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

    const fetchTwice = async (curPage) => {
        const nextPageToken = pageTokens[curPage]
        let res, resDataSecondFetch
        console.log('curPage', curPage)

        if (itemsCache[curPage + 1]) {
            console.log('%c res from cache', 'font-size:30px')
            res = itemsCache[curPage + 1]
            console.log('res', res)
        } else {
            // res= await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
            res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
            if (res.items.length) {
                setItemsCache(prev => ({ ...prev, [curPage]: res }))
            }
        }

        let secondNextPageToken = res.nextPageToken

        console.log('curPage', curPage)
        if (itemsCache[curPage + 2]) {
            console.log('%c resDataSecondFetch from cache', 'font-size:30px')
            resDataSecondFetch = itemsCache[curPage + 2]
        } else {
            // resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
            resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
            if (resDataSecondFetch.items.length) {
                setItemsCache(prev => ({ ...prev, [curPage + 2]: resDataSecondFetch }))
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
        const prevPageToken = state.pageTokens[state.curPage - 2];
        // console.log('prevPageToken', prevPageToken)
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        // console.log('res', res)
        dispatch({ type: 'CLICK_PREV', curPage: state.curPage - 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })

        setRes(res);
        executeScroll();
    }

    const handleClickPageNum = async (token, i) => {
        // console.log('i in pagenum', i)
        // console.log('pageTokens.length', pageTokens.length)
        if (i + 1 === state.pageTokens.length) {
            const { res, resDataSecondFetch } = await fetchTwice(state.curPage)
            // console.log('res in handleClickNext', res)
            if (!resDataSecondFetch.nextPageToken) {
                setLastPage(state.curPage + 1)
                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            } else {
                console.log('state.pageTokens', state.pageTokens)
                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            }
            // console.log('res in handleClickNext', res)
            setRes(res)
            executeScroll();
        } else {
            // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: token });
            const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: token });
            // setCurPage(i + 1);
            dispatch({ type: 'CLICK_PAGENUM', curPage: i + 1 })
            setRes(res);
            executeScroll();
        }
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
                if (!tokenAlreadyExists(nextPageToken)) {
                    // console.log('nextPageToken', nextPageToken)
                    handleSetTokens(prevPageToken, nextPageToken)
                }
            }
        }
    }, [res])


    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        if (i + 1 === state.curPage) return true;
        return false;
    }

    const tokenAlreadyExists = (token) => {
        return state.pageTokens.includes(token);
    }

    const isDisplayNone = (i, curPage) => {

        let displayNone
        const seen = {}

        seen.start = 1
        seen.end = state.pageTokens.length - 1

        const visiblePageNums = getVisibleNavPageNums(state.pageTokens, state.curPage, seen, lastPage)

        if (visiblePageNums.includes(i + 1)) {
            displayNone = false
        } else {
            displayNone = true
        }
        return displayNone
    }

    const getVisibleNavPageNums = (pageTokens, curPage, seen, lastPage) => {

        const { start, end } = seen
        const span = 2
        const maxWinLen = span * 2 + 1
        let highestSeen
        if (lastPage) {
            highestSeen = end - 1
        } else {
            highestSeen = end
        }

        let pageNums = pageTokens.map((el, i) => i + 1)

        if (lastPage) {
            pageNums.pop()
        }

        let low, high
        let index = curPage - 1
        if (curPage === lastPage) {
            // console.log('path1')
            low = lastPage - maxWinLen
            high = lastPage - 1
        } else if (curPage === 1) {
            // console.log('path2')
            low = 0
            high = index + maxWinLen - 1
        } else if (!pageNums[index - span]) {
            // console.log('path3')
            low = 0
            high = index + maxWinLen - curPage
        } else if (!pageNums[index + span]) {
            // console.log('path4')
            high = highestSeen
            // console.log('high', high)
            const addTerm = high - index
            // console.log('addTerm', addTerm)
            low = curPage - maxWinLen + addTerm
            // console.log('low', low)
        } else if (pageNums[index - span] && pageNums[index + span]) {
            // console.log('path5')
            low = index - span
            high = index + span
        }
        let numsForDisplay = pageNums.slice(Math.max(0, low), high + 1)
        return numsForDisplay
    }

    const renderPageNums = () => {
        return state.pageTokens.map((token, i) => {
            return <StyledButton
                // curPage={state.curPage}
                displayNone={isDisplayNone(i, state.curPage)}
                key={i}
                onClick={() => handleClickPageNum(token, i)}
                disabled={isCurrentPage(token, i)}>
                {i + 1}
            </StyledButton>
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