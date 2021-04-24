import { createContext, useContext, useState } from "react";

const DataContext = createContext()
export const useData = () => {
    return useContext(DataContext)
}
const DataProvider =({children}) => {
    const [html,setHtml] = useState('')
    const [css,setCss] = useState('')
    const [js,setJs] = useState('')
    const [algo,setAlgo] = useState('')
    const [steps,setSteps] = useState([])
    const [solutions,setSolutions] = useState([])
    const [solPagination,setSolPagination] = useState(undefined)
    const [pagination, setPagination] = useState(1)
    const value = {
        html,
        setHtml,
        css,
        setCss,
        js,
        setJs,
        algo,
        setAlgo,
        steps,
        setSteps,
        solutions,
        setSolutions,
        solPagination,
        setSolPagination,
        pagination,
        setPagination
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider


