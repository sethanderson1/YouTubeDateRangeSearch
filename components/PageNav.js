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

const NavWrap = styled.div`
    display:flex;
    justify-content:center;
    margin-top:50px;
    margin-bottom:50px;
    /* border: 1px solid red; */
`
export const PageNav = ({ executeScroll }) => {
    console.log('%cPageNav renders', 'color:green')

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

        if (pageTokens[0] !== 'DUMMY') {
            setPageTokens(formerTokens => [...formerTokens, nextPageToken])
        }
    }

    const fetchTwice = async (curPage) => {
        console.log('curPage in fetchTwice', curPage)

        const nextPageToken = pageTokens[curPage]
        console.log('nextPageToken', nextPageToken)
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        let secondNextPageToken = res.nextPageToken
        console.log('secondNextPageToken', secondNextPageToken)
        // const resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        const resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        console.log('resDataSecondFetch', resDataSecondFetch)
        if (!resDataSecondFetch.nextPageToken) {
            console.log('second fetch next page token not null')
            console.log('about to set curPage')
            setCurPage(curPage + 1)
            // setCurPage(prevPage => prevPage + 1)
            console.log('about to set lastPage')

            console.log('curPage in handleClickNext', curPage)
            setLastPage(curPage + 1)
        } else {
            console.log('second fetch next page token is null')
            setCurPage(prevPage => prevPage + 1)
        }

        return res

    }

    const handleClickNext = async () => {
        console.log('%c handleClickNext ran', 'color:orange')

        console.log('curPage in handleClickNext', curPage)
        const nextPageToken = pageTokens[curPage];
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        let secondNextPageToken = res.nextPageToken
        console.log('secondNextPageToken', secondNextPageToken)
        // const resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        const resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        console.log('resDataSecondFetch', resDataSecondFetch)
        if (!resDataSecondFetch.nextPageToken) {
            console.log('second fetch next page token not null')
            console.log('about to set curPage')
            setCurPage(prevPage => prevPage + 1)
            console.log('about to set lastPage')

            console.log('curPage in handleClickNext', curPage)
            setLastPage(curPage + 1)
        } else {
            console.log('second fetch next page token is null')
            setCurPage(prevPage => prevPage + 1)
        }
        setRes(res)
        executeScroll();
    }

    const handleClickPageNum = async (token, i) => {
        console.log('i in pagenum', i)
        console.log('pageTokens.length', pageTokens.length)
        if (i + 1 === pageTokens.length) {
            console.log('')
            const res = await fetchTwice(i)
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

    const handleClickPrev = async () => {
        const prevPageToken = pageTokens[curPage - 2];
        // const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        const res = await fetchDataDummy({ query, maxResults, sortOption, start, end, pageToken: prevPageToken });
        setRes(res);
        setCurPage(prevPage => prevPage - 1);
        executeScroll();

    }

    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        if (i + 1 === curPage) return true;
        return false;
    }


    useEffect(() => {
        console.log('useEffect in PageNav ran')
        console.log('res in useeffect', res)

        if (Object.keys(res).length !== 0) {
            const nextPageToken = res?.nextPageToken;
            console.log('nextPageToken', nextPageToken)
            const prevPageToken = res?.prevPageToken;
            console.log('prevPageToken', prevPageToken)

            console.log('curPage in useeffect', curPage)
            console.log('lastPage in useeffect', lastPage)
            if (lastPage === curPage) {
            } else {
                if (!tokenAlreadyExists(nextPageToken)) {
                    console.log('about to set tokens')
                    handleSetTokens(prevPageToken, nextPageToken)
                }
            }
        }


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
                    <Button onClick={() => handleClickNext()} disabled={curPage === lastPage ? true : false}>Next</Button>
                </NavWrap>
            )
        } else {
            return null;
        }
    }
    return renderNav();
}