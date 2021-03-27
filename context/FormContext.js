import { createContext, useEffect, useState } from 'react'

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {

    const [theme, setTheme] = useState('gray');
    const [query, setQuery] = useState("");
    const [maxResults, setMaxResults] = useState(25);
    const [sortOption, setSortOption] = useState('relevance');
    const [start, setStart] = useState("2005-04-23");
    const [end, setEnd] = useState("2005-06-16");
    const [date, setDate] = useState("");
    const [res, setRes] = useState({});
    const [curPage, setCurPage] = useState(1);
    const [pageTokens, setPageTokens] = useState(['DUMMY']);
    const [hasSearched, setHasSearched] = useState(false);
    const [nextUndef, setNextUndef] = useState(false)
    const [lastPage, setLastPage] = useState(null)
    console.log('lastPage in context', lastPage)
    console.log('curPage in context', curPage)

    // console.log('hasSearched', hasSearched)


    const reset = async () => {
        setPageTokens(['DUMMY']);
        setCurPage(1);
        setLastPage(null);
        console.log('res in reset', res)
        setRes({})
    }



    console.log('%cFormContextProvider ran', 'color:green')

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
            nextUndef,
            setNextUndef,
            lastPage,
            setLastPage
        }}>
            {children}
        </FormContext.Provider>
    )
}