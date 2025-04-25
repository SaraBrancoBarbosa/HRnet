import PropTypes from "prop-types"

function Pagination({
    itemsPerPage = 10,
    totalItems, 
    currentItemIndex = 0,
    currentPage = 0,
    setCurrentPage = () => {}
}) {

  const pagesCount = Math.ceil(totalItems / itemsPerPage)
  
  return (
    <>
      {/* To know the number of entries showing / totalItems */}
      <div>
          Showing {currentItemIndex + 1} to {Math.min(currentItemIndex + itemsPerPage, totalItems)} of {totalItems} entries
        </div>

        {/* Previous and next page + the current page */}
        <nav className="table-pagination">
          <a
            onClick={() => {
              // To forbid the click when on the first page
              if (currentPage > 0) setCurrentPage(currentPage - 1)
            }}
            className={currentPage === 0 ? "disabled" : "change-page"}
          >
            Previous
          </a>

          <span className="current-page">
            {currentPage + 1}
          </span>

          <a 
            // To forbid the click when on the last page
            onClick={() => {
              if (currentPage < pagesCount -1) setCurrentPage(currentPage + 1)
            }}
            className={currentPage >= pagesCount -1 ? "disabled" : "change-page"}
          >
            Next
          </a>
        </nav>
    </>
  )
}

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentItemIndex: PropTypes.number,
    setCurrentPage: PropTypes.func,
}

export default Pagination
