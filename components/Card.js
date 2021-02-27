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


const CardOuterWrap = styled.div`
    width: 100%;
    border: 1px solid black;
    /* margin: 20px 10px 0px 10px; */
    /* padding: 20px 10px 0px 10px; */

    a {
        display:flex;
        justify-content:space-around;
        margin:50px;
    }
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
        <CardOuterWrap>
            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
                <img src={high.url} />
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </a>
        </CardOuterWrap>
    )
}
