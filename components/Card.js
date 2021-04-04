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
    margin-top: 10px;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    a {
        :hover  {
            background-color:rgb(0,0,0,0.2);
            filter: brightness(70%);
        }
    }
`

const ImgAndTextWrap = styled.div`
    /* border: 1px solid blue; */
    @media screen and (min-width: 900px) {
        display: flex;
        justify-content: center;
        
    }
`

const ImageWrap = styled.div`

    img {
        width: 100%;
        @media screen and (min-width: 480px) {
            width: 480px;
        }
    }
`

const TitleAndDescription = styled.div`
    /* border: 1px solid red; */
    text-align: center;
    margin:20px;
    max-width: 450px;
    /* max-height: 309px; */
    overflow: hidden;
    @media screen and (min-width: 900px) {
        width: 450px;   
    }
`



export const Card = ({ data }) => {

    const { snippet: { title, description, thumbnails }, id: { videoId } } = data;
    console.log('title', title)
    const { medium, high } = thumbnails

    return (
        <CardOuterWrap>
            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
                <ImgAndTextWrap>
                    <ImageWrap>
                        <img src={high.url} />
                    </ImageWrap>
                    <TitleAndDescription>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </TitleAndDescription>
                </ImgAndTextWrap>
            </a>
        </CardOuterWrap>
    )
}
