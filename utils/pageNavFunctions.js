


const getVisibleNavPageNums = (pageTokens, curPage, seen, lastPage) => {
    // console.log('seen', seen)
    // console.log('curPage', curPage)
    console.log('pageTokens', pageTokens)

    const { start, end } = seen
    const span = 2
    const maxWinLen = span * 2 + 1
    let highestSeen
    if (lastPage) {
        highestSeen = end - 1
    } else {
        highestSeen = end
    }

    let pageNums = pageTokens.map((el, i) => i + 1)

    if (lastPage) {
        pageNums.pop()
    }

    let low, high
    let index = curPage - 1
    if (curPage === lastPage) {
        // console.log('path1')
        low = lastPage - maxWinLen
        high = lastPage - 1
    } else if (curPage === 1) {
        // console.log('path2')
        low = 0
        high = index + maxWinLen - 1
    } else if (!pageNums[index - span]) {
        // console.log('path3')
        low = 0
        high = index + maxWinLen - curPage
    } else if (!pageNums[index + span]) {
        // console.log('path4')
        high = highestSeen
        // console.log('high', high)
        const addTerm = high - index
        // console.log('addTerm', addTerm)
        low = curPage - maxWinLen + addTerm
        // console.log('low', low)
    } else if (pageNums[index - span] && pageNums[index + span]) {
        // console.log('path5')
        low = index - span
        high = index + span
    }
    // console.log('low', low)
    // console.log('high', high)
    let numsForDisplay = pageNums.slice(Math.max(0, low), high + 1)
    console.log('numsForDisplay', numsForDisplay)
    return numsForDisplay
}


export const isDisplayNone = (i, cur, pageTokens, lastPage) => {
    // console.log('lastPage', lastPage)
    // console.log('pageTokens', pageTokens)
    // console.log('cur', cur)
    let displayNone
    const seen = {}

    seen.start = 1
    seen.end = pageTokens.length - 1

    const visiblePageNums = getVisibleNavPageNums(pageTokens, cur, seen, lastPage)

    if (visiblePageNums.includes(i + 1)) {
        displayNone = false
    } else {
        displayNone = true
    }

    return displayNone
}

export const isCurrentPage = (token, i, curPage) => {
    if (token === 'DUMMY') return true;
    if (i + 1 === curPage) return true;
    return false;
}

export const tokenAlreadyExists = (token, pageTokens) => {
    return pageTokens.includes(token);
}
