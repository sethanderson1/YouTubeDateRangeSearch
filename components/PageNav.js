import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Form as MaterialForm,
} from '@material-ui/core'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
import fetchData from '../utils/fetchData';

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
    console.log('pageTokens', pageTokens)
    console.log('curPage', curPage)

    const setTokens = (prevPageToken, nextPageToken) => {
        if (prevPageToken && pageTokens[0] === 'DUMMY') {
            // console.log('setTokens opt 1')
            // setPageTokens(formerTokens => [prevPageToken, ...formerTokens])
            const newTokenArr = [prevPageToken, pageTokens[1], nextPageToken];
            // console.log('newTokenArr', newTokenArr)
            setPageTokens(newTokenArr);
        } else {
            // console.log('setTokens opt 2')
            // console.log('pageTokens', pageTokens)
            setPageTokens(formerTokens => [...formerTokens, nextPageToken]);
        }
    }

    const handleClickNext = async () => {
        const nextPageToken = pageTokens[curPage];
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        // ====
        let secondNextPageToken = res.nextPageToken
        console.log('secondNextPageToken', secondNextPageToken)
        const resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        // if no next page token, handle accordingly in pagenav
        if (!resDataSecondFetch.nextPageToken) {
            setNextUndef(true)
            setLastPage(curPage)
        }
        console.log('resDataSecondFetch', resDataSecondFetch)

        // ====
        setRes(res)
        setCurPage(prevPage => prevPage + 1)
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
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: token });
        setRes(res);
        setCurPage(i + 1);
        executeScroll();
    }

    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        if (i + 1 === curPage) return true;
        return false;
    }


    useEffect(() => {
        const nextPageToken = res?.nextPageToken;
        console.log('nextPageToken', nextPageToken)
        const prevPageToken = res?.prevPageToken;
        console.log('prevPageToken', prevPageToken)
        setNextUndef(false);

        // if (res?.lastPage) {
        //     console.log('this is the last page')
        // }

        console.log('curPage', curPage)
        console.log('lastPage', lastPage)
        if (lastPage === curPage) {
            // next is grayed out
            setNextUndef(true)
        } else {
            console.log('lastPage not current page')
            setTokens(prevPageToken, nextPageToken);
        }



        // if ((prevPageToken || nextPageToken)) {
        //     if (!(tokenAlreadyExists(prevPageToken) || tokenAlreadyExists(nextPageToken))) {
        //         console.log('setting tokens')
        //         if (nextPageToken !== undefined) {
        //             if (lastPage === curPage) {

        //             } else {
        //                 setTokens(prevPageToken, nextPageToken);
        //             }
        //         } else {
        //             setNextUndef(true);
        //         }
        //     }
        // }
    }, [res])

    const tokenAlreadyExists = (token) => {
        return pageTokens.includes(token);
    }

    const renderNav = () => {
        if (hasSearched) {
            return (
                <NavWrap>
                    <Button onClick={() => handleClickPrev()} disabled={curPage === 1 ? true : false} >Prev</Button>
                    {pageTokens.map((token, i) => <Button key={i} onClick={() => handleClickPageNum(token, i)} disabled={isCurrentPage(token, i)}>{i + 1}</Button>)}
                    <Button onClick={() => handleClickNext()} disabled={nextUndef ? true : false}>Next</Button>
                </NavWrap>
            )
        } else {
            return null;
        }
    }
    return renderNav();
}