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
    const [sortOption, setSortOption] = useState("relavance");
    const [query, setQuery] = useState("");
    const context = useContext(FormContext);
    const { start, setStart, end, setEnd, date, setDate } = context;

    useEffect(() => {

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('e', e)
        console.log('query', query)
        console.log('sortOption', sortOption)
        console.log('start', start)
        console.log('end', end)

        // fetchData(query, sortOptions, start)
    }

    const fetchData = (query, sortOptions, start) => {

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
                                <FormControlLabel value="relavance" control={<Radio />} label="Relavance" />
                                <FormControlLabel value="uploadDate" control={<Radio />} label="Upload Date" />
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
