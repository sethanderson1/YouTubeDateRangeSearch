import { createContext, useEffect, useState } from 'react'

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
    const [start, setStart] = useState("2005-04-23");
    const [end, setEnd] = useState("2005-04-24");
    const [date, setDate] = useState("");
    
    console.log('start in context', start)
    console.log('end in context', end)
    console.log('date in context', date)

    return (
        <FormContext.Provider value={{
            start,
            setStart,
            date,
            setDate,
            end,
            setEnd
        }}>
            {children}
        </FormContext.Provider>
    )
}


