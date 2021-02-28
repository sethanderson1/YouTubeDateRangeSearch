import { useState, useEffect } from "react";

export default function useFetch({ query, sortOption, start, end, maxResults, pageToken }) {
    const [res, setRes] = useState(null);

    const params = {
        key: process.env.NEXT_PUBLIC_API_KEY,
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
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return queryItems.join('&');
    }

    const searchURL = `https://youtube.googleapis.com/youtube/v3/search`;
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;


    useEffect(() => {
        const fetchData = async () => {

            console.log('url in fetchData', url)
            try {
                res = await axios(url);
                console.log('res', res)
                console.log('res.data.nextPageToken', res.data.nextPageToken)
                setRes(res.data)
            } catch (e) {
                console.log('e', e)
            }
        }
        fetchData();
    }, []);

    return { res };
}