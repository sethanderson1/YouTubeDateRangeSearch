import React, { useState } from 'react'
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
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import DatePicker from './DatePicker'
import styled from 'styled-components'


const OuterWrap = styled.div`
    display:flex;
    justify-content: center;
    margin: 0 10px;
`
const SearchWrap = styled.div`
    display:flex;
    justify-content:center;
    button {
        /* margin-left:10px; */
        border-left: rgba(0,0,0,0);
        border-radius: 0 5px 5px 0;
    }
    .MuiOutlinedInput-root {
        border-radius: 5px 0 0 5px;
        input {
            width: 250px;
            height: 40px;
            padding: 0;
            padding-left: 10px;
        }
    }
`
const OptionsddWrap = styled.div`
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

export const Form = () => {
    const [sortOption, setSortOption] = useState("relavance")
    console.log('sortOption', sortOption)
    return (
        <OuterWrap>
            <FormControl component="fieldset">
                <SearchWrap>
                    <TextField variant="outlined" />
                    <Button variant='outlined' ><SearchIcon /></Button>
                </SearchWrap>
                <OptionsddWrap>
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
                </OptionsddWrap>
            </FormControl>
        </OuterWrap>
    )
}
