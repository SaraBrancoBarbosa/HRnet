import PropTypes from "prop-types"

function SearchBar({ filterText, handleFilterChange }) {
    
  return (
    <div style={{padding: 2}}>
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
    handleFilterChange: PropTypes.func.isRequired,
}

export default SearchBar
