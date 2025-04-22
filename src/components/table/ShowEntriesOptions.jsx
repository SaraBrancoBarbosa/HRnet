import PropTypes from "prop-types"

function ShowEntriesOptions({rowsPerPage, handleRowsPerPageChange}) {
  return (
    <div>
        <label>
        Show {" "}
        <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
        >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>{" "}
        entries
        </label>
    </div>
  )
}

ShowEntriesOptions.propTypes = {
    filterText: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
}

export default ShowEntriesOptions
