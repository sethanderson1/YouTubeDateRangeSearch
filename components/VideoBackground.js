import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';
import styled from 'styled-components'

const Video = styled.video`
    position:fixed;
    width: 100%;
    z-index: -1;
    filter:brightness(30%);
    `

const VideoWrap = styled.div`
    /* width:100vw;
    height:100vh;
    background-color: white;
    position: fixed; */
    height: 100vh;
    width:100vw;
    z-index: -21;
    background-color: black;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    `

export const VideoBackground = () => {

    const context = useContext(FormContext);

    const { hasSearched } = context;

    const renderVideo = () => {
        if (!hasSearched) {
            return (
                <VideoWrap>
                    <Video autoPlay loop muted id='video' >
                        <source src={'/kitten.mp4'} type="video/mp4" />
                    </Video>
                </VideoWrap>
            )
        } else {
            return null
        }

    }

    return renderVideo();

}