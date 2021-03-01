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
import styled from 'styled-components'
import { CardList } from './CardList';
import { PageNav } from './PageNav';

const ResOuterWrap = styled.div`
    width: 100%;
    /* border: 1px solid blue; */
    margin-top: 20px;
`
export const Results = () => {

    return (
        <ResOuterWrap>
            <CardList />
            {/* <QueryContextProvider> */}
                <PageNav />
            {/* </QueryContextProvider> */}
        </ResOuterWrap>
    )
}