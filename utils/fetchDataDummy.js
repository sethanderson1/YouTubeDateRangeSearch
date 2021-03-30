


const items = []

const imageUris = [
    'https://via.placeholder.com/600/92c952',
    'https://via.placeholder.com/600/771796',
    'https://via.placeholder.com/600/24f355',
    'https://via.placeholder.com/600/d32776',
    'https://via.placeholder.com/600/f66b97',
    // 'https://via.placeholder.com/600/b0f7cc',
    // 'https://via.placeholder.com/600/54176f',
    // 'https://via.placeholder.com/600/51aa97',
    // 'https://via.placeholder.com/600/810b14',
    // 'https://via.placeholder.com/600/1ee8a4',
]

console.log('imageUris.length', imageUris.length)
for (let i = 0; i < imageUris.length; i++) {
    const title = `title ${i + 1}`
    const description = `description ${i + 1}`
    const medium = `medium ${i + 1}`
    const url = `BLANK ${i + 1}`
    // const url = imageUris[i]
    const videoId = `videoId ${i + 1}`

    items.push({
        snippet: {
            title,
            description,
            thumbnails: {
                medium,
                high: {
                    url
                }
            }
        },
        id: { videoId }
    })
}


export default async function fetchDataDummy({ query, sortOption, start, end, maxResults, pageToken }) {
    // console.log('maxResults', maxResults)
    console.log('%c pageToken in fetch', 'color:purple', pageToken)
    // console.log('items in fetch', items)
    await new Promise((resolve) => setTimeout(resolve, 100))
    let dummyPageTokens
    const res = {
        // items
    }

    const setPageTokens = (dummyPageTokens) => {
        let index = dummyPageTokens.findIndex(el => el === pageToken)
        console.log('dummyPageTokens', dummyPageTokens)
        console.log('pageToken in setPageTokens', pageToken)
        console.log('index in setPageTokens', index)

        const startInd = index * maxResults
        console.log('startInd', startInd)
        const endInd = startInd + maxResults
        console.log('endInd', endInd)

        if (index === 0) {
            res.prevPageToken = undefined
            res.nextPageToken = dummyPageTokens[index + 1]
        } else if (index === dummyPageTokens.length - 1) {
            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = undefined
        } else {
            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = dummyPageTokens[index + 1]
        }
        res.items = items.slice(startInd, endInd)




    }

    if (query === '') {
        // dummyPageTokens = ['A', 'B', 'C', 'D']
        dummyPageTokens = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        // dummyPageTokens = ['A', 'B', 'C']
        if (!pageToken) {
            console.log('went to !pageToken block')
            res.items = items.slice(0, maxResults)

            res.prevPageToken = dummyPageTokens[0]
            res.nextPageToken = dummyPageTokens[1]
        } else {
            console.log('went to has pagetoken block with token: ', pageToken)
            setPageTokens(dummyPageTokens)
        }
        console.log('%c res.items', 'font-size:20px', res.items)

    }

    // debugger
    console.log('res right before return from dummy data fetch', res)
    return res

}