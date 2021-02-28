import { createContext, useEffect, useState } from 'react'

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {

    const [query, setQuery] = useState("");
    const [maxResults, setMaxResults] = useState(1);
    const [sortOption, setSortOption] = useState('relevance');
    const [start, setStart] = useState("2005-04-23");
    const [end, setEnd] = useState("2005-04-24");
    const [date, setDate] = useState("");
    const [res, setRes] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageTokens, setPageTokens] = useState(['DUMMY']);
    const [hasSearched, setHasSearched] = useState(false);
    console.log('hasSearched', hasSearched)


    const reset = () => {
        setPageTokens(['DUMMY']);
        setCurPage(1);
    }

    console.log('%cFormContextProvider ran','color:green')

    return (
        <FormContext.Provider value={{
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
            setHasSearched
        }}>
            {children}
        </FormContext.Provider>
    )
}