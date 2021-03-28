


const items = []

const imageUris = [
    'https://via.placeholder.com/600/92c952',
    'https://via.placeholder.com/600/771796',
    'https://via.placeholder.com/600/24f355',
    'https://via.placeholder.com/600/d32776',
    'https://via.placeholder.com/600/f66b97',
    'https://via.placeholder.com/600/b0f7cc',
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
    console.log('%c pageToken', 'color:purple', pageToken)
    console.log('items', items)

    await new Promise((resolve) => setTimeout(resolve, 100))

    let dummyPageTokens
    const res = {
        // items
    }
    // console.log('items in fetch', items)


    const setPageTokens = (dummyPageTokens) => {
        let index = dummyPageTokens.findIndex(el => el === pageToken)
        console.log('dummyPageTokens', dummyPageTokens)
        console.log('index', index)
        if (index === dummyPageTokens.length - 1) {
            console.log('%c index === dummyPageTokens.length - 1', 'font-size:20px')
            res.items = items.slice(index + 1)
            console.log('items.slice(index + 1)', items.slice(index + 1))
            console.log('items.slice(index + 2)', items.slice(index + 2))
            console.log('res.items', res.items)

            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = undefined
            debugger
            console.log('res right before return from dummy data fetch', res)
            return res
        } else if (index === 0) {
            res.items = items.slice(0, maxResults)

            res.prevPageToken = undefined
            res.nextPageToken = dummyPageTokens[index + 1]
            
        } else {
            // TODO: figure out why we're getting to this block 
            // when should be getting to first block upon click next
            // to last page. 
            res.items = items.slice(index + 2, index + 2 + maxResults)

            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = dummyPageTokens[index + 1]
        }
    }

    if (query === '') {
        dummyPageTokens = ['A', 'B', 'C']
        // dummyPageTokens = ['A', 'B', 'C', 'D']
        // dummyPageTokens = ['A', 'B', 'C']
        if (!pageToken) {
            res.items = items.slice(0, maxResults)
            console.log('res.items', res.items)
            
            res.prevPageToken = dummyPageTokens[0]
            res.nextPageToken = dummyPageTokens[1]
        } else {
            setPageTokens(dummyPageTokens)
        }
        console.log('res.items', res.items)
        debugger
        console.log('res right before return from dummy data fetch', res)
        return res
    } else {
        //     // console.log('query is non empty --> ???', query)
        //     dummyPageTokens = ['A', 'B']

        //     if (!pageToken) {
        //         res.nextPageToken = 'B'
        //         res.prevPageToken = 'A'
        //     } else {
        //         res.nextPageToken = undefined
        //         res.prevPageToken = 'B'
        //     }
    }



}