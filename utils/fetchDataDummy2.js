import { dummyData } from '../dummyData/dummyData'

export default async function fetchDataDummy2({ query, sortOption, start, end, maxResults, pageToken }) {

    await new Promise((resolve) => setTimeout(resolve, 100))

    console.log('pageToken', pageToken)
    if (pageToken === undefined || pageToken === 'CAoQAQ') {
        return dummyData[0]
    } else if (pageToken === 'CAoQAA') {
        return dummyData[1]
    } else if (pageToken === 'CBQQAA') {
        return dummyData[2]
    } else if (pageToken === 'CB4QAA') {
        return dummyData[3]
    } else {
        return dummyData[4]
    }


}


