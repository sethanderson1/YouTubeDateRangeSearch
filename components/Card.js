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


export const Card = ({ data }) => {
    console.log('data', data)

    const { snippet: { title, description, thumbnails }, id: { videoId } } = data;
    const { medium, high } = thumbnails

    // responseJson.items[i].snippet.thumbnails.medium.url
    // "https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}"
    // responseJson.items[i].snippet.description
    // responseJson.items[i].snippet.title






    return (
        <ResOuterWrap>
            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
                <img src={high.url} />
            </a>
            <p>Ima card</p>
        </ResOuterWrap>
    )
}
