import React from 'react'
import styled from 'styled-components'
import { CardList } from './CardList';
import { PageNav } from './PageNav';

const ResOuterWrap = styled.div`
    width: 100%;
    margin-top: 40px;
`
export const Results = () => {

    return (
        <ResOuterWrap>
            <CardList />
            <PageNav />
        </ResOuterWrap>
    )
}