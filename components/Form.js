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
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import DatePicker from './DatePicker'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
import axios from 'axios';
// import useFetch from '../hooks/useFetch'
import fetchData from '../utils/fetchData'

export const Form = () => {
    console.log('%cForm renders', 'color:green')
    const context = useContext(FormContext);
    console.log('context', context)
    const [qry, setQry] = useState('');
    // const [qry, setQry] = useState('');
    const queryRef = useRef(null);

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

    const SearchWrap = styled.div`
        display:flex;
        justify-content:center;
        margin:0 auto;
        /* border: 1px solid ${theme === 'white' ? 'white' : 'white'}; */
        border:1px solid white;
        button {
            border-left: rgba(0,0,0,0);
            border-radius: 0 5px 5px 0;
        }
        .MuiOutlinedInput-root {
            border-radius: 5px 0 0 5px;
            input {
                height: 40px;
                padding: 0;
                padding-left: 10px;
                color: ${theme};

            }
        }
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






// TODO: change input component to its own component so rerenders more light





    // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // reset page tokens
        // resetPageTokens();
        reset();
        console.log('queryRef', queryRef)
        console.log('e.target', e.target)
        console.log('e.target.value', e.target.value)
        console.log('qry', qry)
        console.log('query', query)
        console.log('sortOption', sortOption)
        console.log('start', start)
        console.log('end', end)
        let pageToken = undefined;
        const resData = await fetchData({ query: qry, maxResults, sortOption, start, end, pageToken });
        // console.log('resData', resData)

        setHasSearched(true);
        setQuery(qry);
        setRes(resData);

    }

    // const handleOnChange = (e) => {
    //     return (e) => setQuery(e.target.value)
    // }

    return (
        <OuterWrap>
            <FormWrap onSubmit={(e) => handleSubmit(e)} >
                {/* <FormControl component="fieldset" > */}
                <SearchWrap>
                    {/* <TextField variant="outlined" fullWidth={true}  value={query} onChange={(e) => setQuery(e.target.value)} autoFocus/> */}
                    <TextField ref={queryRef} variant="outlined" fullWidth={true} value={qry} onChange={(e) => setQry(e.target.value)} autoFocus />
                    {/* <TextField variant="outlined" fullWidth={true}  autoFocus/> */}
                    <Button variant='outlined' type="submit"><SearchIcon /></Button>
                </SearchWrap>
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