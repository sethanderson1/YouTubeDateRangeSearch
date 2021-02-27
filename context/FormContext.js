import { createContext, useEffect, useState } from 'react'

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
    const [start, setStart] = useState("2005-04-23");
    const [end, setEnd] = useState("2005-04-24");
    const [date, setDate] = useState("");
    const [res, setRes] = useState([]);

    useEffect(() => {

    }, [start, end, res])

    return (
        <FormContext.Provider value={{
            start,
            setStart,
            date,
            setDate,
            end,
            setEnd,
            res,
            setRes,
        }}>
            {children}
        </FormContext.Provider>
    )
}