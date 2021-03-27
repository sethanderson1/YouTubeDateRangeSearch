
export default async function fetchDataDummy({ query, sortOption, start, end, maxResults, pageToken }) {
    console.log('maxResults', maxResults)
    console.log('%c pageToken', 'color:purple', pageToken)

    await new Promise((resolve) => setTimeout(resolve, 100))

    let dummyPageTokens
    const res = {}

    if (query === '') {
        dummyPageTokens = ['A', 'B', 'C']
        
        if (!pageToken) {
            res.nextPageToken = 'B'
            res.prevPageToken = 'A'
        } else if (pageToken === 'B') {
            res.nextPageToken = 'C'
            res.prevPageToken = 'A'
        } else if (pageToken === 'C') {
            res.nextPageToken = undefined
            res.prevPageToken = 'B'
        } else if (pageToken === 'A') {
            res.nextPageToken = 'B'
            res.prevPageToken = undefined
        }
        
    } else {
        console.log('query is non empty --> ???', query)
        dummyPageTokens = ['A', 'B']

        if (!pageToken) {
            res.nextPageToken = 'B'
            res.prevPageToken = 'A'
        } else {
            res.nextPageToken = undefined
            res.prevPageToken = 'B'
        }
    }


    return res

}