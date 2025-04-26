import PropTypes from "prop-types"
import { useCallback } from "react"

function ShowEntriesOptions({setRowsPerPage, rowsPerPage, setCurrentPage }) {
  
  // To manage the entries to show
    const handleRowsPerPageChange = useCallback((e) => {
      setRowsPerPage(Number(e.target.value))
      setCurrentPage(0)
    },[setRowsPerPage, setCurrentPage])
  
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
  setRowsPerPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

export default ShowEntriesOptions
