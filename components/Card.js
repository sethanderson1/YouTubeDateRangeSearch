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


const ResOuterWrap = styled.div`
    width: 100%;
    border: 1px solid black;
    margin-top: 20px;
`


export const Card = () => {

    
    return (
        <ResOuterWrap>
            <p>Ima card</p>
        </ResOuterWrap>
    )
}
