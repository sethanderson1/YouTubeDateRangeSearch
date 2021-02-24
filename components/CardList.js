import React, { useState, useEffect } from 'react'
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


const ResOuterWrap = styled.div`
    width: 100%;
    border: 1px solid black;
    margin-top: 20px;
`



export const CardList = () => {
    console.log('List')
    const res =
    {
        "kind": "youtube#searchListResponse",
        "etag": "M41wy2XEyZf-aPvLPGYlET5UVK0",
        "nextPageToken": "CAIQAA",
        "regionCode": "US",
        "pageInfo": {
            "totalResults": 1000000,
            "resultsPerPage": 2
        },
        "items": [
            {
                "kind": "youtube#searchResult",
                "etag": "tZhNPCuzqzs8fn-2vMHvUzzMJCw",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "ma67yOdMQfs"
                },
                "snippet": {
                    "publishedAt": "2021-01-23T17:00:15Z",
                    "channelId": "UC--3c8RqSfAqYBdDjIG3UNA",
                    "title": "These Were The All-Time Surfing Moments Of The Year | Best Of 2020",
                    "description": "Well, that was a weird ride. Though it hasn't been easy, at least when we fixed our gaze on the ocean — or favorite place in the world – very little had changed.",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/ma67yOdMQfs/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/ma67yOdMQfs/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/ma67yOdMQfs/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Red Bull Surfing",
                    "liveBroadcastContent": "none",
                    "publishTime": "2021-01-23T17:00:15Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "OdTFmZoH0Yx40z_Wc8ryq9lqD8Q",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "RC-24Nfr7fc"
                },
                "snippet": {
                    "publishedAt": "2021-02-23T17:49:35Z",
                    "channelId": "UCqhnX4jA0A5paNd1v-zEysw",
                    "title": "GoPro: Big Wave Surfing with Kai Lenny at Jaws",
                    "description": "GoPro Athlete Kai Lenny's winter at Jaws Thanks to GoPro HERO9 Black, you get to witness Mother Nature's raw power from the comfort of your couch ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/RC-24Nfr7fc/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/RC-24Nfr7fc/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/RC-24Nfr7fc/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "GoPro",
                    "liveBroadcastContent": "none",
                    "publishTime": "2021-02-23T17:49:35Z"
                }
            }
        ]
    }


    console.log('res', res)


    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("relavance");
    const [startDate, setStartDate] = useState("2005-04-23T05:55:00Z");
    const [endDate, setEndDate] = useState("2005-04-24T05:55:00Z");
    const [query, setQuery] = useState('');
    const maxResults = 2;

    const params = {
        // key: apiKey,
        q: query,
        part: 'snippet',
        maxResults,
        type: 'video',
        // order: 'date',
        order,
        publishedAfter: endDate,
        publishedBefore: startDate
    };

    function formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }
    const searchURL = `https://www.googleapis.com/youtube/v3/search`;
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    const fetchData = async () => {
        try {
            const res = await axios(url);
            console.log('res', res)
        } catch (e) {

        }
    }


    




    return (
        <ResOuterWrap>
            {items.map(item => <Card data={item} />)}
        </ResOuterWrap>
    )
}
