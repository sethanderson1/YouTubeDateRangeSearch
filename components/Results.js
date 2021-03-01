import React, { useRef } from 'react'
import styled from 'styled-components'
import { CardList } from './CardList';
import { PageNav } from './PageNav';

const ResOuterWrap = styled.div`
    width: 100%;
    margin-top: 40px;
`

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export const Results = () => {

    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);
    return (
        <ResOuterWrap>
            <div ref={myRef}></div>
            <CardList />
            <PageNav executeScroll={executeScroll} />
        </ResOuterWrap>
    )
}