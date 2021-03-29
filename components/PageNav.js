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
    visibility: ${props => props.pageNumsHidden ? 'hidden' : 'visible'};

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
export const PageNav = ({ executeScroll }) => {
    console.log('%cPageNav renders', 'color:green')
    const [pageNumsHidden, setPageNumsHidden] = useState(true)

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
        setLastPage
    } = context;

    const handleSetTokens = (prevPageToken, nextPageToken) => {
        console.log('handleSetTokens ran')
        // console.log('prevPageToken in handleSetTokens', prevPageToken)
        // console.log('nextPageToken in handleSetTokens', nextPageToken)
        // if we're at the first fetch, we should end up with
        // ['DUMMY', SOMETOKEN]
        if (pageTokens[0] === 'DUMMY' && pageTokens.length === 1) {
            setPageTokens([prevPageToken, nextPageToken])
        }

        if (pageTokens[0] !== 'DUMMY') {
            setPageTokens(formerTokens => [...formerTokens, nextPageToken])
        }
    }

    const fetchTwice = async (curPage) => {
        console.log('curPage in fetchTwice', curPage)

        const nextPageToken = pageTokens[curPage]
        console.log('nextPageToken in fetchtwice', nextPageToken)
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        console.log('res first fetch of two', res)
        let secondNextPageToken = res.nextPageToken
        console.log('secondNextPageToken', secondNextPageToken)
        // TODO: cache res 
        // const resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        const resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        // console.log('resDataSecondFetch', resDataSecondFetch)
        if (!resDataSecondFetch.nextPageToken) {
            // console.log('about to set curPage',curPage)
            setCurPage(curPage + 1)
            // console.log('curPage in handleClickNext', curPage)
            setLastPage(curPage + 1)
        } else {
            setCurPage(prevPage => prevPage + 1)
        }
        console.log('res right before return', res)
        return res
    }

    const handleClickNext = async () => {
        console.log('%c handleClickNext ran', 'color:orange')
        console.log('curPage in handleClickNext', curPage)
        // debugger
        const response = await fetchTwice(curPage)
        console.log('response in handleClickNext', response)
        setRes(response)
        executeScroll();
    }

    const handleClickPrev = async () => {
        const prevPageToken = pageTokens[curPage - 2];
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        setRes(res);
        setCurPage(prevPage => prevPage - 1);
        executeScroll();
    }

    const handleClickPageNum = async (token, i) => {
        console.log('i in pagenum', i)
        // console.log('pageTokens.length', pageTokens.length)
        if (i + 1 === pageTokens.length) {
            console.log('')
            const res = await fetchTwice(i)
            console.log('res in handleclickpagenum', res)
            setRes(res);
            executeScroll();
        } else {
            // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: token });
            const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: token });
            setRes(res);
            setCurPage(i + 1);
            executeScroll();
        }
    }

    useEffect(() => {
        console.log('useEffect in PageNav ran')
        // console.log('res in useeffect', res)
        setPageNumsHidden(true)
        if (Object.keys(res).length !== 0) {
            const nextPageToken = res?.nextPageToken;
            // console.log('nextPageToken', nextPageToken)
            const prevPageToken = res?.prevPageToken;
            // console.log('prevPageToken', prevPageToken)

            // console.log('curPage in useeffect', curPage)
            // console.log('lastPage in useeffect', lastPage)
            if (lastPage === curPage) {
            } else {
                if (!tokenAlreadyExists(nextPageToken)) {
                    // console.log('about to set tokens')
                    handleSetTokens(prevPageToken, nextPageToken)
                }
            }
        }



    }, [res])

    // useEffect(()=>setPageNumsHidden(true),[res])

    useEffect(() => {
        debugger
        setPageNumsHidden(false)
    }, [pageTokens])

    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        if (i + 1 === curPage) return true;
        return false;
    }




    const tokenAlreadyExists = (token) => {
        return pageTokens.includes(token);
    }

    const shouldBeDisplayNone = (i, curPage) => {
        const low = curPage - 3
        const high = curPage + 3
        // return i + 1 <= low 
        return i + 1 <= low || i + 1 >= high
    }

    const renderNav = () => {
        // console.log('hasSearched', hasSearched)
        if (hasSearched) {
            return (
                <NavWrapOuter>
                    <NavWrapInner pageNumsHidden={pageNumsHidden}>
                        <Button onClick={() => handleClickPrev()} disabled={curPage === 1 ? true : false} >Prev</Button>
                        {pageTokens.map((token, i) => {
                            // console.log('pageTokens in button', pageTokens)
                            // console.log('i in button', i)
                            // console.log('token', token)
                            console.log('i', i)
                            console.log('curPage', curPage)
                            return <StyledButton
                                curPage={curPage}
                                displayNone={shouldBeDisplayNone(i, curPage)}
                                key={i}
                                onClick={() => handleClickPageNum(token, i)}
                                disabled={isCurrentPage(token, i)}>
                                {i + 1}
                            </StyledButton>
                        }

                        )}
                        <Button onClick={() => handleClickNext()} disabled={curPage === lastPage ? true : false}>Next</Button>
                    </NavWrapInner>
                </NavWrapOuter>
            )
        } else {
            return null;
        }
    }
    return renderNav();
}