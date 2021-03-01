import React, { useState } from 'react'
import {
    Button,
    TextField,
    Form as MaterialForm,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components'

const theme = 'gray';

const SearchWrap = styled.div`
display:flex;
justify-content:center;
margin:0 auto;
button {
    border-left: rgba(0,0,0,0);
    border-radius: 0 5px 5px 0;
    color: ${theme};
    border-left: 1px solid ${theme};
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

export const Search = ({ submitHandler, hasSearched }) => {
    console.log('%cSearch renders', 'color:green')
    const [qry, setQry] = useState("");

    const handleOnChange = (e) => {
        setQry(e.target.value);
    }

    const handleKeyPress = e => {
        if (e.charCode === 13) handleClick(e);
    };

    const handleClick = (e) => {
        e.preventDefault();
        submitHandler(qry)
    }

    return (
        <SearchWrap style={{
            border: `1px solid ${hasSearched ? 'white' : 'gray'}`
        }}>
            <TextField variant="outlined" fullWidth={true} value={qry} onChange={handleOnChange} onKeyPress={handleKeyPress} />
            <Button variant='outlined' type="submit" onClick={handleClick} ><SearchIcon /></Button>
        </SearchWrap>
    )
}
