import axios from 'axios';

export default async function fetchData({ query, sortOption, start, end, maxResults, pageToken }) {
    console.log('query in fetch data', query)
    fetch('https://l8o8ahwhyf.execute-api.us-west-1.amazonaws.com/live/item/')


    const params = {
        key: process.env.NEXT_PUBLIC_API_KEY,
        // key: process.env.NEXT_PUBLIC_API_KEY1,
        q: query,
        // part: 'contentDetails',
        part: 'snippet',
        maxResults,
        type: 'video',
        order: sortOption,
        publishedAfter: `${start}T05:55:00Z`,
        publishedBefore: `${end}T05:55:00Z`
    };

    function formatQueryParams(params) {
        if (pageToken && pageToken !== 'DUMMY') params.pageToken = pageToken;
        console.log('pageToken', pageToken)
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }

    const searchURL = `https://youtube.googleapis.com/youtube/v3/search`;
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log('url in fetchData', url)
    // try {
    //     const res = await axios(url);
    //     console.log('res', res)
    //     console.log('res.data.nextPageToken', res.data.nextPageToken)
    //     if (res.data.items > 0) {
    //         return res.data;
    //     } else {
    //         fetchData({ query, sortOption, start, end, maxResults, pageToken });
    //     }
    // } catch (e) {
    //     console.log('e', e)
    // }

    try {
        const res = await axios(url);
        console.log('res', res)
        console.log('res.data.nextPageToken', res.data.nextPageToken)
        return res.data
    } catch (e) {
        console.log('e', e)
    }
}