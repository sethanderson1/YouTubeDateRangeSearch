import React, { useState, useContext, useEffect, useRef } from 'react'
import {
    Button,
    Input,
    TextField,
    Checkbox,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,

} from '@material-ui/core'
import DatePicker from './DatePicker'
import styled from 'styled-components'
import { FormContext } from '../context/FormContext';
// import useFetch from '../hooks/useFetch'
import fetchData from '../utils/fetchData'
import fetchDataDummy from '../utils/fetchDataDummy'
import { Search } from './Search';

const theme = 'gray';

const OuterWrap = styled.div`
icon {
    color:${theme};
}
    margin: 0 auto;
    width: 60vw;
    min-width:320px;
    max-width:600px;
    form {
        width: 100%;
        /* fieldset {
            width: 100%;
        } */
    }
    @media screen and (max-width: 340px ) {
        .MuiFormControlLabel-label {
            font-size: 14px;
        }
        #date {
            font-size: 14px;
        }
    }
`

const FormWrap = styled.form`
    /* display: flex;
    justify-content: center; */
`

const OptionsWrap = styled.div`
    margin-top:10px;
    display:flex;
    justify-content:space-around;
    color: ${theme};
`

const SortOptionWrap = styled.div`
    display: flex;
    flex-direction: column;
    .MuiSvgIcon-root {
        width: 15px;
        height: 15px;
    }
`

const DatesWrap = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: space-around; */
    label {
        color: ${theme};
    }
    #date {
        color: ${theme};
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
    /* background-color: gray; */
    /* color: gray; */
}
`

export const Form = () => {
    console.log('%cForm renders', 'color:green')
    const context = useContext(FormContext);
    const [clickedSubmit, setClickedSubmit] = useState(false)
    const {
        theme,
        setTheme,
        query,
        setQuery,
        maxResults,
        setMaxResults,
        sortOption,
        setSortOption,
        start,
        setStart,
        date,
        setDate,
        end,
        setEnd,
        res,
        setRes,
        pageTokens,
        setPageTokens,
        curPage,
        setCurPage,
        hasSearched,
        setHasSearched,
        lastPage,
        setLastPage,
        state,
        dispatch,
        itemsCache,
        setItemsCache
    } = context;

    useEffect(() => {
        if (hasSearched) {
            setTheme('black');
        }
    }, [hasSearched])

    const fetchTwice = async (query) => {
        // console.log('query in finally fetch', query)
        let resData, resDataSecondFetch

        let pageToken = undefined;
        // resData = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken });
        resData = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken });
        console.log('resData', resData)
        // got data for first page
        // use next page token on second fetch
        let secondNextPageToken = resData.nextPageToken
        console.log('secondNextPageToken', secondNextPageToken)
        // console.log('secondNextPageToken', secondNextPageToken)
        // resDataSecondFetch = await fetchData({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        resDataSecondFetch = await fetchDataDummy({ query: query, maxResults, sortOption, start, end, pageToken: secondNextPageToken });
        console.log('resDataSecondFetch', resDataSecondFetch)
        // if no next page token, set last page to current page
        if (!resDataSecondFetch.nextPageToken) {
            console.log('no next token')
            // console.log('curPage in fetchtwice', curPage)
            setLastPage(curPage)

        }


        if (resData.items.length) {
            console.log('there are videos')
            setItemsCache({ [curPage]: resData })
            // setItemsCache(prev => ({ ...prev, [curPage]: res }))
        }

        if (resDataSecondFetch.items.length) {
            setItemsCache(prev => ({ ...prev, [curPage + 1]: resDataSecondFetch }))
        }



        return resData;
    }

    const submitHandler = async (query) => {
        // console.log('query', query)
        // console.log('context', context)
        setQuery(query);

        // reset()
        dispatch({ type: 'RESET' })



        setClickedSubmit(true)


    }

    useEffect(() => {
        const asyncFunc = async () => {
            if (curPage === 1 && clickedSubmit) {

                const resData = await fetchTwice(query);
                console.log('resData', resData)

                setHasSearched(true);
                setRes(resData);
                setClickedSubmit(false)
            }
        }
        asyncFunc()
    }, [curPage, query, clickedSubmit])

    return (
        <OuterWrap>
            <FormWrap>
                {/* <FormControl component="fieldset" > */}
                <Search submitHandler={submitHandler} hasSearched={hasSearched} />
                <OptionsWrap >
                    <SortOptionWrap>
                        <RadioGroup aria-label="video sort options" name="sort-options" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <FormControlLabel value="relevance" control={<Radio />} label="Relevance" />
                            <FormControlLabel value="date" control={<Radio />} label="Upload Date" />
                            <FormControlLabel value="viewCount" control={<Radio />} label="View Count" />
                        </RadioGroup>
                    </SortOptionWrap>
                    <DatesWrap>
                        <DatePicker label="start" />
                        <DatePicker label="end" />
                    </DatesWrap>
                </OptionsWrap>
                {/* </FormControl> */}
            </FormWrap>
        </OuterWrap >
    )
}