
export default async function fetchDataDummy({ query, sortOption, start, end, maxResults, pageToken }) {
    console.log('maxResults', maxResults)
    console.log('%c pageToken', 'color:purple', pageToken)

    await new Promise((resolve) => setTimeout(resolve, 100))

    let dummyPageTokens
    const res = {}

    const setPageTokens = (dummyPageTokens) => {
        let index = dummyPageTokens.findIndex(el => el === pageToken)
        if (index === dummyPageTokens.length - 1) {
            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = undefined
        } else if (index === 0){
            res.prevPageToken = undefined
            res.nextPageToken = dummyPageTokens[index + 1]
        } else {
            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = dummyPageTokens[index + 1]
        }
    }

    if (query === '') {
        dummyPageTokens = ['A', 'B', 'C', 'D']
        // dummyPageTokens = ['A', 'B', 'C']


        if (!pageToken) {
            res.prevPageToken = dummyPageTokens[0]
            res.nextPageToken = dummyPageTokens[1]
            // } else if (pageToken === 'B') {
            //     res.prevPageToken = 'A'
            //     res.nextPageToken = 'C'
            // } else if (pageToken === 'C') {
            //     res.prevPageToken = 'B'
            //     res.nextPageToken = undefined
            // } else if (pageToken === 'A') {
            //     res.prevPageToken = undefined
            //     res.nextPageToken = 'B'
        } else {
            setPageTokens(dummyPageTokens)
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