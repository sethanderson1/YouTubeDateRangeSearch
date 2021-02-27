import React, { useState, useContext, useEffect } from 'react'
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

const OuterWrap = styled.div`
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
        }
    }
`
const OptionsWrap = styled.div`
    margin-top:10px;
    display:flex;
    justify-content:space-around;
    
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
`

export const Form = () => {
    console.log('%cForm renders', 'color:green')
    const [sortOption, setSortOption] = useState("relevance");
    const [query, setQuery] = useState("");
    const context = useContext(FormContext);
    const { start, setStart, end, setEnd, date, setDate, res, setRes } = context;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const maxResults = 1;
    let data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('query', query)
        console.log('sortOption', sortOption)
        console.log('start', start)
        console.log('end', end)
        data = await fetchData();
        console.log('data', data)
    }

    useEffect(() => {
        setRes(data);
    }, [data])


    const params = {
        key: apiKey,
        q: query,
        // part: 'contentDetails',
        part: 'snippet',
        maxResults,
        type: 'video',
        order: sortOption,
        publishedAfter: `${start}T05:55:00Z`,
        publishedBefore: `${end}T05:55:00Z`
    };

    const searchURL = `https://youtube.googleapis.com/youtube/v3/search`;
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    function formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }


    const fetchData = async () => {
        console.log('url in fetchData', url)
        try {
            const res = await axios(url);
            console.log('res', res)
            setRes(res.data)
        } catch (e) {
            console.log('e', e)

        }
    }

    return (
        <OuterWrap>
            <FormWrap onSubmit={(e) => handleSubmit(e)} >
                {/* <FormControl component="fieldset" > */}
                <SearchWrap>
                    <TextField variant="outlined" fullWidth={true} value={query} onChange={(e) => setQuery(e.target.value)} />
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