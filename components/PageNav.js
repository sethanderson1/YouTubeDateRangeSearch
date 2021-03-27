import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Form as MaterialForm,
} from '@material-ui/core'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
import fetchData from '../utils/fetchData';
// import { nanoid } from 'nanoid'

const NavWrap = styled.div`
    display:flex;
    justify-content:center;
    margin-top:50px;
    margin-bottom:50px;
    /* border: 1px solid red; */
`
export const PageNav = ({ executeScroll }) => {
    console.log('%cPageNav renders', 'color:green')
    // const [nextUndef, setNextUndef] = useState(false)

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
        nextUndef,
        setNextUndef,
        lastPage,
        setLastPage
    } = context;
    // console.log('pageTokens', pageTokens)
    console.log('curPage', curPage)

    const handleSetTokens = (prevPageToken, nextPageToken) => {
        console.log('handleSetTokens ran')
        console.log('prevPageToken in handleSetTokens', prevPageToken)
        console.log('nextPageToken in handleSetTokens', nextPageToken)
        // if we're at the first fetch, we should end up with
        // ['DUMMY', SOMETOKEN]
        if (pageTokens[0] === 'DUMMY' && pageTokens.length === 1) {
            setPageTokens([prevPageToken, nextPageToken])
        }
        // if (prevPageToken && pageTokens[0] === 'DUMMY') {
        //     // console.log('handleSetTokens opt 1')
        //     // setPageTokens(formerTokens => [prevPageToken, ...formerTokens])
        //     const newTokenArr = [prevPageToken, pageTokens[1], nextPageToken];
        //     // console.log('newTokenArr', newTokenArr)
        //     setPageTokens(newTokenArr);
        // } else {
        //     // console.log('handleSetTokens opt 2')
        //     // console.log('pageTokens', pageTokens)
        //     setPageTokens(formerTokens => [...formerTokens, nextPageToken]);
        // }
    }

    const handleClickNext = async () => {
        console.log('%c handleClickNext ran', 'color:orange')

        console.log('curPage', curPage)
        const nextPageToken = pageTokens[curPage];
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        let secondNextPageToken = res.nextPageToken
        console.log('secondNextPageToken', secondNextPageToken)
        const resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        console.log('resDataSecondFetch', resDataSecondFetch)
        if (!resDataSecondFetch.nextPageToken) {
            setNextUndef(true)
            setCurPage(prevPage => prevPage + 1)
            setLastPage(curPage + 1)
        }

        setCurPage(prevPage => prevPage + 1)
        setRes(res)
        executeScroll();
    }

    const handleClickPrev = async () => {
        const prevPageToken = pageTokens[curPage - 2];
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        setRes(res);
        setCurPage(prevPage => prevPage - 1);
        executeScroll();

    }

    const handleClickPageNum = async (token, i) => {
        console.log('i in pagenum', i)
        if (pageTokens.length === i + 1) {
            handleClickNext()
        } else {
            const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: token });
            setRes(res);
            setCurPage(i + 1);
            executeScroll();
        }
    }

    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        if (i + 1 === curPage) return true;
        return false;
    }


    useEffect(() => {
        console.log('useEffect in PageNav ran')
        console.log('res in useeffect', res)

        // if (res) {
        const nextPageToken = res?.nextPageToken;
        console.log('nextPageToken', nextPageToken)
        const prevPageToken = res?.prevPageToken;
        console.log('prevPageToken', prevPageToken)
        setNextUndef(false);

        console.log('curPage in useeffect', curPage)
        console.log('lastPage in useeffect', lastPage)
        if (lastPage === curPage) {
            setNextUndef(true)
        } else {
            if (!tokenAlreadyExists(nextPageToken)) {
                console.log('about to set tokens')
                handleSetTokens(prevPageToken, nextPageToken)
            }
        }
        // }


    }, [res])

    const tokenAlreadyExists = (token) => {
        return pageTokens.includes(token);
    }

    const renderNav = () => {
        console.log('hasSearched', hasSearched)
        if (hasSearched) {
            return (
                <NavWrap>
                    <Button onClick={() => handleClickPrev()} disabled={curPage === 1 ? true : false} >Prev</Button>
                    {pageTokens.map((token, i) => {
                        console.log('pageTokens in button', pageTokens)
                        // console.log('i in button', i)
                        // console.log('token', token)
                        return <Button key={i} onClick={() => handleClickPageNum(token, i)} disabled={isCurrentPage(token, i)}>{i + 1}</Button>
                    }

                    )}
                    {/* <Button onClick={() => handleClickNext()} disabled={nextUndef ? true : false}>Next</Button> */}
                    <Button onClick={() => handleClickNext()} disabled={curPage === lastPage ? true : false}>Next</Button>
                </NavWrap>
            )
        } else {
            return null;
        }
    }
    return renderNav();
}