import PropTypes from "prop-types"

function SearchBar({ filterText, handleFilterChange }) {
    
  return (
    <div>
        <label>
        Search: {" "}
        <input 
            type="search" 
            placeholder="" 
            value={filterText} 
            onChange={handleFilterChange}
        />
        </label>
    </div>
  )
}

SearchBar.propTypes = {
    filterText: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
}

export default SearchBar
