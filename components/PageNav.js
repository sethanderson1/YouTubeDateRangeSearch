import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
    Button,
    Input,
    TextField,
    Checkbox,
    RadioGroup,
    Radio,
    FormControl,
    Form as MaterialForm,
    FormLabel,
    FormControlLabel,

} from '@material-ui/core'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
import fetchData from '../utils/fetchData';


const ResOuterWrap = styled.div`
    display:flex;
    justify-content:center;
    border: 1px solid red;
`
export const PageNav = () => {
    console.log('%cPageNav renders', 'color:green')

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
        setCurPage
    } = context;
    console.log('pageTokens', pageTokens)



    const setTokens = (prevPageToken, nextPageToken) => {
        if (prevPageToken && pageTokens[0] === 'DUMMY') {
            console.log('setTokens opt 1')
            // setPageTokens(formerTokens => [prevPageToken, ...formerTokens])
            const newTokenArr = [prevPageToken, pageTokens[1], nextPageToken];
            console.log('newTokenArr', newTokenArr)
            setPageTokens(newTokenArr);
        } else {
            console.log('setTokens opt 2')
            console.log('pageTokens', pageTokens)
            setPageTokens(formerTokens => [...formerTokens, nextPageToken]);
        }
    }

    const handleClickNext = async () => {
        // fetch with next token
        const nextPageToken = pageTokens[pageTokens.length - 1];
        console.log('nextPageToken in PageNav', nextPageToken)
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: nextPageToken })
        console.log('res in PageNav', res)
        setRes(res)
        setCurPage(prevPage => prevPage + 1)
    }

    const handleClickPrev = async () => {
        const prevPageToken = pageTokens[pageTokens.length - 1 - 1];
        console.log('prevPageToken in PageNav', prevPageToken)
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: prevPageToken })
        console.log('res in PageNav', res)
        setRes(res)
        setCurPage(prevPage => prevPage - 1)

    }

    const handleClickPageNum = async (token, i) => {
        const res = await fetchData({ query, maxResults, sortOption, start, end, pageToken: token })
        console.log('token', token)
        console.log('res in PageNav', res)
        console.log('i', i)
        console.log('curPage', curPage)
        setRes(res)
        setCurPage(i + 1)

    }

    const isCurrentPage = (token, i) => {
        if (token === 'DUMMY') return true;
        console.log('curPage', curPage)
        console.log('i', i)
        if (i + 1 === curPage) return true;
        return false;
    }


    useEffect(() => {
        console.log('res in useeffect', res)
        const nextPageToken = res?.nextPageToken;
        console.log('nextPageToken', nextPageToken)
        const prevPageToken = res?.prevPageToken;
        console.log('prevPageToken', prevPageToken)


        console.log('curPage', curPage)
        console.log('pageTokens.length', pageTokens.length)

        if ((prevPageToken || nextPageToken)) {
            if (!(tokenAlreadyExists(prevPageToken) || tokenAlreadyExists(nextPageToken))) {
                console.log('setting tokens')
                setTokens(prevPageToken, nextPageToken)
            }
        }
    }, [res])

    const tokenAlreadyExists = (token) => {
        return pageTokens.includes(token);
    }

    return (
        <ResOuterWrap>
            <Button onClick={() => handleClickPrev()} disabled={pageTokens.length === 0 ? true : false} >Prev</Button>
            {pageTokens.map((token, i) => <Button key={i} onClick={() => handleClickPageNum(token, i)} disabled={isCurrentPage(token, i)}>{i + 1}</Button>)}
            {/* {pageTokensTest.map((token, i) => <Button key={i} onClick={() => handleClickPageNum(token)} disabled={isCurrentPage(token)}>{i + 1}</Button>)} */}
            <Button onClick={() => handleClickNext()}>Next</Button>
        </ResOuterWrap>
    )
}