import { createContext, useEffect, useState } from 'react'

export const FormContext = createContext();

let renderCount = 0

export const FormContextProvider = ({ children }) => {
    renderCount += 1
    console.log('%c FormContextProvider ran renderCount','color:pink', renderCount)
    const [theme, setTheme] = useState('gray');

    const [query, setQuery] = useState("");
    const [maxResults, setMaxResults] = useState(2);
    const [sortOption, setSortOption] = useState('relevance');
    const [start, setStart] = useState("2005-04-23");
    const [end, setEnd] = useState("2005-06-16");
    const [date, setDate] = useState("");

    const [res, setRes] = useState({});
    console.log('res in context', res)
    const [hasSearched, setHasSearched] = useState(false);
    const [pageTokens, setPageTokens] = useState(['DUMMY']);
    const [curPage, setCurPage] = useState(1);
    const [lastPage, setLastPage] = useState(null)
    
    // console.log('pageTokens in context', pageTokens)
    console.log('curPage in context', curPage)
    console.log('lastPage in context', lastPage)

    const reset = async () => {
        setPageTokens(['DUMMY']);
        setCurPage(1);
        setLastPage(null);
        console.log('res in reset', res)
        setRes({})
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
            pageTokens,
            setPageTokens,
            curPage,
            setCurPage,
            hasSearched,
            setHasSearched,
            lastPage,
            setLastPage
        }}>
            {children}
        </FormContext.Provider>
    )
}