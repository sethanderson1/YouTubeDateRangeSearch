


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
        // TODO: index needs to refer to the index of the items, NOT the dummyTokens
        // change so that it references correct index of items
        if (index === 0) {
            res.items = [items[0],items[1],items[2]]

            res.prevPageToken = undefined
            res.nextPageToken = dummyPageTokens[index + 1]
        } else if (index === 1) {
            res.items = [items[3],items[4]]

            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = dummyPageTokens[index + 1]
        } else if (index === 2) {
            res.items = []

            res.prevPageToken = dummyPageTokens[index - 1]
            res.nextPageToken = undefined
        }

        // if (index === 0) {
        //     res.items = [items[0],items[1],items[2]]
        // } 



 
        // if (index  === dummyPageTokens.length - 1) {
        // // if (index + 1 === dummyPageTokens.length - 1) {
        // // if (index + 1 === dummyPageTokens.length - 1) {
        //     console.log('%c went into first block since this is last page', 'font-size:20px')
        //     res.items = items.slice(index + 1)
        //     console.log('res.items', res.items)

        //     res.prevPageToken = dummyPageTokens[index - 1]
        //     res.nextPageToken = undefined
        // } else if (index === 0) {
        //     console.log('%c i dont think youll ever see me', 'font-size:30px')
        //     res.items = items.slice(0, maxResults)

        //     res.prevPageToken = undefined
        //     res.nextPageToken = dummyPageTokens[index + 1]

        // } else {
        //     res.items = items.slice(index + 1, index + 1 + maxResults)

        //     res.prevPageToken = dummyPageTokens[index - 1]
        //     res.nextPageToken = dummyPageTokens[index + 1]
        // }
    }

    if (query === '') {
        dummyPageTokens = ['A', 'B', 'C']
        // dummyPageTokens = ['A', 'B', 'C', 'D']
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
        console.log('res.items', res.items)

    }

    // debugger
    console.log('res right before return from dummy data fetch', res)
    return res

}