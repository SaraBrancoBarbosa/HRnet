import PropTypes from "prop-types"
import { useCallback } from "react"

function SearchBar({ setFilterText, setCurrentPage }) {
    
  // Filter management
  const handleFilterChange = useCallback((e) => {
    setFilterText(e.target.value)
    setCurrentPage(0)
  }, [setFilterText, setCurrentPage])

  return (
    <div style={{padding: 2}}>
        <label>
        Search: {" "}
        <input 
            type="search" 
            placeholder="" 
            onChange={handleFilterChange}
        />
        </label>
    </div>
  )
}

SearchBar.propTypes = {
  setFilterText: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

export default SearchBar
