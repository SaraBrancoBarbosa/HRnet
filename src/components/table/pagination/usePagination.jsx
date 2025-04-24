import { useState } from "react"

const usePagination = ({totalItems, itemsPerPage, defaultPage = -1}) => {
    
    const [currentPage, handleCurrentPage] = useState(defaultPage >= 0 ? defaultPage : 0)
    
    const [currentItemIndex, setCurrentItemIndex] = useState(0)

    const setCurrentPage = (page) => {
        setCurrentItemIndex(page * itemsPerPage)
        handleCurrentPage(page)
    }
  
    return {currentPage, currentItemIndex, itemsPerPage, totalItems, setCurrentPage}
}

export default usePagination
