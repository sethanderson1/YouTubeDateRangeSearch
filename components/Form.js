import React, { useState, useContext, useEffect, useRef } from 'react'
import {
    Button,
    Input,
    TextField,
    Checkbox,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,

} from '@material-ui/core'
import DatePicker from './DatePicker'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
// import useFetch from '../hooks/useFetch'
import fetchData from '../utils/fetchData'
import { Search } from './Search';

const theme = 'gray';

const OuterWrap = styled.div`
icon {
    color:${theme};
}
margin: 0 auto;
    width: 60vw;
    min-width:320px;
    max-width:600px;

    form {
        width: 100%;
        /* fieldset {
            width: 100%;
        } */
    }
    @media screen and (max-width: 340px ) {
        .MuiFormControlLabel-label {
            font-size: 14px;
        }
        #date {
            font-size: 14px;
        }
    }
`

const FormWrap = styled.form`
    /* display: flex;
    justify-content: center; */
`

const OptionsWrap = styled.div`
    margin-top:10px;
    display:flex;
    justify-content:space-around;
    color: ${theme};
`

const SortOptionWrap = styled.div`
    display: flex;
    flex-direction: column;
    .MuiSvgIcon-root {
        width: 15px;
        height: 15px;
    }
`

const DatesWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    label {
        color: ${theme};
    }
    #date {
        color: ${theme};
    }
`

export const Form = () => {
    console.log('%cForm renders', 'color:green')
    const context = useContext(FormContext);
    const {
        theme,
        setTheme,
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
        setHasSearched } = context;

    useEffect(() => {
        if (hasSearched) {
            setTheme('black');
        }
    }, [hasSearched])

    const finallyFetch = async (qry) => {
        console.log('query in finally fetch', qry)
        reset();

        let pageToken = undefined;
        const resData = await fetchData({ query: qry, maxResults, sortOption, start, end, pageToken });
        return resData;
    }

    const submitHandler = async (qry) => {
        console.log('qry', qry)
        console.log('context', context)
        setQuery(qry);

        const resData = await finallyFetch(qry);
        setHasSearched(true);
        setRes(resData);
    }

    return (
        <OuterWrap>
            <FormWrap>
                {/* <FormControl component="fieldset" > */}
                <Search submitHandler={submitHandler} />
                <OptionsWrap >
                    <SortOptionWrap>
                        <RadioGroup aria-label="video sort options" name="sort-options" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <FormControlLabel value="relevance" control={<Radio />} label="Relevance" />
                            <FormControlLabel value="date" control={<Radio />} label="Upload Date" />
                            <FormControlLabel value="viewCount" control={<Radio />} label="View Count" />
                        </RadioGroup>
                    </SortOptionWrap>
                    <DatesWrap>
                        <DatePicker label="start" />
                        <DatePicker label="end" />
                    </DatesWrap>
                </OptionsWrap>
                {/* </FormControl> */}
            </FormWrap>
        </OuterWrap >
    )
}