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
    margin-top: 40px;

    /* border: 1px solid black; */
`

export const CardList = ({ visibility }) => {
    console.log('visibility', visibility)
    console.log('%cCardList renders', 'color:green')

    const { res, setRes } = useContext(FormContext);
    // const [items, setItems] = useState([])
    // console.log('items', items)
    console.log('res', res)
    let items = res && res.items;
    console.log('items in CardList', items)

    // useEffect(() => {
    //     console.log('res.items', res.items)
    //     setItems(res.items)
    // }, [res])



    const renderList = () => {

        return (
            <ResOuterWrap style={{ visibility: `${visibility}` }}>
                {items && items.map(item => <Card key={item.id.videoId} data={item} />)}
                {/* <pre>
                    {res && JSON.stringify(res, null, 2)}
                </pre> */}
            </ResOuterWrap>
        )
    }


    return renderList()
}