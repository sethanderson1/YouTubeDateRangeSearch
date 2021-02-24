import React, { useState } from 'react'
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
`

const DatesddWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e', e)
}

export const Form = () => {
    const [sortOption, setSortOption] = useState("relavance")
    console.log('sortOption', sortOption)

    return (
        <OuterWrap>
            <form onSubmit={handleSubmit} >
                {/* <FormControl component="fieldset" > */}
                <SearchWrap>
                    <TextField variant="outlined" fullWidth={true} />
                    <Button variant='outlined'><SearchIcon /></Button>
                </SearchWrap>
                <OptionsWrap >
                    <SortOptionWrap>
                        <RadioGroup aria-label="video sort options" name="sort-options" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <FormControlLabel value="relavance" control={<Radio />} label="Relavance" />
                            <FormControlLabel value="uploadDate" control={<Radio />} label="Upload Date" />
                            <FormControlLabel value="viewCount" control={<Radio />} label="View Count" />
                        </RadioGroup>
                    </SortOptionWrap>
                    <DatesddWrap>
                        <DatePicker defaultDate="2005-04-23" label="start" />
                        <DatePicker defaultDate="2005-04-24" label="end" />
                    </DatesddWrap>
                </OptionsWrap>
                {/* </FormControl> */}
            </form>
        </OuterWrap >
    )
}
