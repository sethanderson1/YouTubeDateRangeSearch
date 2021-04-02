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
    console.log('lastPage', lastPage)
    const [itemsCache, setItemsCache] = useState({})

    const [testPageNum, setTextPageNum] = useState(1)
    console.log('testPageNum', testPageNum)
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
                return {
                    ...state,
                    curPage: action.curPage,
                    pageTokens: [action.pageTokens.prevPageToken, action.pageTokens.nextPageToken]
                }
            case 'RESET':
                setLastPage(null)
                setRes({})
                setItemsCache({})
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
    // console.log('state', state)

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
            testPageNum,
            setTextPageNum
        }}>
            {children}
        </FormContext.Provider>
    )
}