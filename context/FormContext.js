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
    const [end, setEnd] = useState("2005-06-16");
    const [date, setDate] = useState("");

    const [res, setRes] = useState({});
    const [hasSearched, setHasSearched] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    // const [pageTokens, setPageTokens] = useState(['DUMMY']);
    // const [curPage, setCurPage] = useState(1);
    // const [pageNums, setPageNums]

    const initialState = {
        curPage: 1,
        pageTokens: ['DUMMY']
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'display_new_page_nums':
                console.log('action', action)
                console.log('state', state)
                return {
                    ...state,
                    curPage: action.curPage,
                    pageTokens: [...state.pageTokens, action.pageTokens.nextPageToken]
                };
            case 'display_first_new_page_nums':
                return {
                    ...state,
                    curPage: action.curPage,
                    pageTokens: [action.pageTokens.prevPageToken,action.pageTokens.nextPageToken]
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('state', state)

    // debugger
    console.log('res in context', res)

    const reset = async () => {
        // setPageTokens(['DUMMY']);
        // setCurPage(1);
        // setLastPage(null);
        // // console.log('res in reset', res)
        // setRes({})
    }

    return (
        <FormContext.Provider value={{
            theme,
            setTheme,
            reset,
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
            dispatch
        }}>
            {children}
        </FormContext.Provider>
    )
}