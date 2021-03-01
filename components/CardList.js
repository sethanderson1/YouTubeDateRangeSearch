import React, { useState, useEffect, useContext } from 'react'
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
import axios from 'axios';
import { Card } from './Card';
import { FormContext } from '../context/FormContext';


const ResOuterWrap = styled.div`
    width: 100%;
    /* border: 1px solid black; */
`

export const CardList = () => {
    console.log('%cCardList renders', 'color:green')

    const { res, setRes } = useContext(FormContext);
    // console.log('res', res)
    let items = res && res.items;

    const renderList = () => {
        return (
            <ResOuterWrap>
                {items && items.map(item => <Card key={item.id.videoId} data={item} />)}
            </ResOuterWrap>
        )
    }


    return renderList()
}