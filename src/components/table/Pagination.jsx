import PropTypes from "prop-types"

function Pagination({
    indexOfFirstRow, 
    indexOfLastRow, 
    totalRows, 
    currentPage,
    pageNumbers,
    handleChangePage
}) {
  return (
    <>
      {/* To know the number of entries showing / total */}
      <div>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, totalRows)} of {totalRows} entries
        </div>

        {/* Previous and next page + the current page */}
        <nav className="table-pagination">
          <a
            onClick={() => {
              // To forbid the click when on the first page
              if (currentPage > 1) handleChangePage(currentPage - 1)
            }}
            className={currentPage === 1 ? "disabled" : "change-page"}
          >
            Previous
          </a>

          <span className="current-page">
            {currentPage}
          </span>

          <a 
            // To forbid the click when on the last page
            onClick={() => {
              if (currentPage < pageNumbers.length) handleChangePage(currentPage + 1)
            }}
            className={currentPage === pageNumbers.length ? "disabled" : "change-page"}
          >
            Next
          </a>
        </nav>
    </>
  )
}

Pagination.propTypes = {
    indexOfFirstRow: PropTypes.number.isRequired,
    indexOfLastRow: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageNumbers: PropTypes.array.isRequired,
    handleChangePage: PropTypes.func.isRequired,
}

export default Pagination
