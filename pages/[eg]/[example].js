import { useContext } from 'react'
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'next/router'


function Page({ pagenum }) {

    // const context = useContext(FormContext);
    // console.log('context', context)
    // const {
    //     query,
    //     setQuery,
    //     maxResults,
    //     setMaxResults,
    //     sortOption,
    //     setSortOption,
    //     start,
    //     setStart,
    //     date,
    //     setDate,
    //     end,
    //     setEnd,
    //     res,
    //     setRes,
    //     pageTokens,
    //     setPageTokens,
    //     curPage,
    //     setCurPage,
    //     hasSearched,
    //     setHasSearched,
    //     lastPage,
    //     setLastPage,
    //     state,
    //     dispatch,
    //     itemsCache,
    //     setItemsCache
    // } = context;

    // setMaxResults(2)

    return (
        <div>
            {pagenum}
        </div>
    )
}


export default function Example() {
    const router = useRouter()
    console.log('router', router)
    console.log('router.query', router.query)
    
    let pagenum = 1

    return (
        <div>
            Hello
            <Page pagenum={pagenum} />
        </div>
    )
}