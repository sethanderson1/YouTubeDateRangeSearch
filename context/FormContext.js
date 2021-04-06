import { createContext, useEffect, useState, useReducer } from 'react'

export const FormContext = createContext();

let renderCount = 0

export const FormContextProvider = ({ children }) => {
    renderCount += 1
    console.log('%c FormContextProvider ran renderCount', 'color:pink', renderCount)
    const [theme, setTheme] = useState('gray');

    const [query, setQuery] = useState("");
    const [maxResults, setMaxResults] = useState(1);
    const [sortOption, setSortOption] = useState('relevance');
    const [start, setStart] = useState("2005-04-23");
    // const [end, setEnd] = useState("2005-06-16");
    const [end, setEnd] = useState("2005-06-16");
    const [date, setDate] = useState("");

    const [res, setRes] = useState({});
    const [hasSearched, setHasSearched] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const [itemsCache, setItemsCache] = useState({})
    
    const [urlPageNum, setUrlPageNum] = useState(1)
    const [shouldDisplay, setShouldDisplay] = useState(true)
    const [justSearched, setJustSearched] = useState(false)

    // const [displayCards, setDisplayCards] = useState(false)

    
    console.log('urlPageNum', urlPageNum)
    console.log('shouldDisplay', shouldDisplay)
    console.log('res', res)
    // console.log('lastPage', lastPage)
    // console.log('urlPageNum', urlPageNum)
    // console.log('itemsCache', itemsCache)

    const initialState = {
        curPage: 1,
        pageTokens: ['DUMMY']
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'CLICK_NEXT':
                // console.log('action', action)
                // console.log('state', state)
                return {
                    ...state,
                    curPage: action.curPage,
                    pageTokens: [...state.pageTokens, action.pageTokens.nextPageToken]
                };
            case 'CLICK_PREV':
                // console.log('action', action)
                // console.log('state', state)
                return {
                    ...state,
                    curPage: action.curPage,
                    pageTokens: state.pageTokens
                };
            case 'CLICK_PAGENUM':
                // console.log('action', action)
                // console.log('state', state)
                return {
                    ...state,
                    curPage: action.curPage,
                };
            case 'CLICK_SEARCH':
                console.log('CLICK_SEARCH')
                console.log('action', action)
                console.log('state', state)
                return {
                    ...state,
                    curPage: action.curPage,
                    pageTokens: [action.pageTokens.prevPageToken, action.pageTokens.nextPageToken]
                }
            case 'RESET':
                setLastPage(null)
                setRes({})
                setItemsCache({})
                setShouldDisplay(true)
                setHasSearched(false)
                return {
                    ...state,
                    curPage: 1,
                    pageTokens: ['DUMMY'],
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('state.curPage', state.curPage)
    console.log('state.pageTokens', state.pageTokens)

    // debugger
    // console.log('res in context', res)

    return (
        <FormContext.Provider value={{
            theme,
            setTheme,
            query,
            setQuery,
            maxResults,
            setMaxResults,
            sortOption,
            setSortOption,
            start,
            setStart,
            date,
            setDate,
            end,
            setEnd,
            res,
            setRes,
            pageTokens: state.pageTokens,
            setPageTokens: state.setPageTokens,
            curPage: state.curPage,
            setCurPage: state.setCurPage,
            hasSearched,
            setHasSearched,
            lastPage,
            setLastPage,
            state,
            dispatch,
            itemsCache,
            setItemsCache,
            urlPageNum,
            setUrlPageNum,
            shouldDisplay,
            setShouldDisplay,
            justSearched,
            setJustSearched
        }}>
            {children}
        </FormContext.Provider>
    )
}