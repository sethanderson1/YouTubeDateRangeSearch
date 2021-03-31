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
    // const [pageNumsHidden, setPageNumsHidden] = useState(true)

    const context = useContext(FormContext);
    const {
        reset,
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
        dispatch
    } = context;
    console.log('state', state)

    const handleSetTokens = (prevPageToken, nextPageToken) => {
        console.log('handleSetTokens ran')
        // if we're at the first fetch, we should end up with
        // ['DUMMY', SOMETOKEN]
        if (pageTokens[0] === 'DUMMY' && pageTokens.length === 1) {
            // setPageTokens([prevPageToken, nextPageToken])
            dispatch({ type: 'display_first_new_page_nums', curPage: state.curPage, pageTokens: { prevPageToken, nextPageToken } })
        }
        if (pageTokens[0] !== 'DUMMY') {
            dispatch({ type: 'CLICK_NEXT', curPage: state.curPage, pageTokens: { prevPageToken, nextPageToken } })
            // setPageTokens(formerTokens => [...formerTokens, nextPageToken])
        }
    }

    const fetchTwice = async (curPage) => {
        const nextPageToken = pageTokens[curPage]
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        let secondNextPageToken = res.nextPageToken
        // TODO: cache res 
        // const resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        const resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });

        return { res, resDataSecondFetch }
    }

    const handleClickNext = async () => {
        console.log('%c handleClickNext ran', 'color:orange')
        console.log('curPage in handleClickNext', state.curPage)
        // console.log('state.curPage', state.curPage)
        // console.log('state.pageTokens.length - 2', state.pageTokens.length - 2)
        if (state.curPage < state.pageTokens.length - 1) {
            // console.log('state.pageTokens.length - 2', state.pageTokens.length - 2)
            // handleClickPageNum
        } else {

            const { res, resDataSecondFetch } = await fetchTwice(state.curPage)
            console.log('res in handleClickNext', res)
            if (!resDataSecondFetch.nextPageToken) {
                setLastPage(state.curPage + 1)
                dispatch({ type: 'CLICK_NEXT', curPage: state.curPage + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            } else {
                console.log('state.pageTokens', state.pageTokens)
                dispatch({ type: 'CLICK_NEXT', curPage: state.curPage + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            }
            console.log('res in handleClickNext', res)
            setRes(res)
            executeScroll();
        }
    }

    const handleClickPrev = async () => {
        const prevPageToken = pageTokens[state.curPage - 2];
        console.log('prevPageToken', prevPageToken)
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        console.log('res', res)
        dispatch({ type: 'CLICK_PREV', curPage: state.curPage - 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })

        setRes(res);
        // setCurPage(prevPage => prevPage - 1);
        executeScroll();
    }

    const handleClickPageNum = async (token, i) => {
        console.log('i in pagenum', i)
        // console.log('pageTokens.length', pageTokens.length)
        if (i + 1 === pageTokens.length) {
            const { res, resDataSecondFetch } = await fetchTwice(state.curPage)
            console.log('res in handleClickNext', res)
            if (!resDataSecondFetch.nextPageToken) {
                setLastPage(state.curPage + 1)
                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            } else {
                console.log('state.pageTokens', state.pageTokens)
                dispatch({ type: 'CLICK_NEXT', curPage: i + 1, pageTokens: { prevPageToken: res.prevPageToken, nextPageToken: res.nextPageToken } })
            }
            console.log('res in handleClickNext', res)
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
                    console.log('nextPageToken', nextPageToken)
                    handleSetTokens(prevPageToken, nextPageToken)
                    // dispatch({ type: 'display_new_page_nums',curPage: curPage + 1 })
                }
            }
        }
        // debugger
    }, [res])


    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        if (i + 1 === state.curPage) return true;
        return false;
    }

    const tokenAlreadyExists = (token) => {
        return pageTokens.includes(token);
    }

    const shouldBeDisplayNone = (i, curPage) => {
        console.log('curPage', curPage)
        const low = state.curPage - 3
        const high = state.curPage + 3
        let displayNone = i + 1 <= low || i + 1 >= high
        if (lastPage === i) {
            displayNone = true
        }
        console.log('displayNone', displayNone)
        // debugger
        return displayNone
    }

    const setPageNums = () => {
        // debugger
        // const pageNums = pageTokens
        return pageTokens.map((token, i) => {
            return <StyledButton
                curPage={state.curPage}
                displayNone={shouldBeDisplayNone(i, state.curPage)}
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
                        {setPageNums()}
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