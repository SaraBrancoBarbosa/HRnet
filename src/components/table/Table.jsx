import PropTypes from "prop-types"
import "./table.css"

function TableComponent({ columns, data, pagination, entriesPerPage, onPageChange, deleteData }) {
  
  //To delete the row data
  const handleDelete = (dataId) => {
    deleteData(dataId)
  }
  
  return (
    <div className="table_wrapper">

      {/* To choose the number of entries to show per page */}
      <div className="entries-and-search">
        <div id="table_length">
          <label>
            Show {" "}
            <select
              name="table_length"
              value={entriesPerPage}
              onChange={(e) => onPageChange(e.target.value)}
              aria-controls="table"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>

        {/* Search bar */}
        <div id="table_filter">
          <label>
            Search: {" "}
            <input type="search" placeholder="" aria-controls="table" />
          </label>
        </div>
      </div>

      {/* Table */}
      <table id="table" role="grid" aria-describedby="table_info">
        
        {/* Columns names (first row) */}
        <thead>
          <tr role="row">
            {columns.map((column, index) => (
              <th key={index} tabIndex="0" aria-controls="table" rowSpan="1" colSpan="1">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        {/* To display the data (one row for each group of elements) */}
        <tbody>
          {data.map((row, index) => (
            <tr key={index} role="row">
              {/* We "remove" the last column containing the id => the delete button takes its place */}
              {row.slice(0, -1).map((field, fieldIndex) => (
                <td key={fieldIndex}>{field}</td>
              
                // Without removing the last column:
                //{row.map((field, fieldIndex) => (
              ))}

              {/* Button to delete the row data. The 9th row is used for the data id */}
              <td>
                <button onClick={() => handleDelete(row[9])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="info-and-pagination">

        {/* To know the number of entries showing / total */}
        <div id="table_info" role="status" aria-live="polite">
          Showing {pagination.start} to {pagination.end} of {pagination.total} entries
        </div>

        {/* Previous and next page + the current page */}
        <div id="table_paginate">
          <a
            aria-controls="table"
            data-dt-idx="0"
            tabIndex="-1"
            onClick={() => onPageChange(pagination.prevPage)}
            id="table_previous"
          >
            Previous
          </a>

          <span>
            <a
              aria-controls="table"
              data-dt-idx="1"
              tabIndex="0"
              onClick={() => onPageChange(pagination.nextPage)}
            >
              {pagination.currentPage}
            </a>
          </span>

          <a
            aria-controls="table"
            data-dt-idx="2"
            tabIndex="-1"
            onClick={() => onPageChange(pagination.nextPage)}
            id="table_next"
          >
            Next
          </a>
          
        </div>
      </div>
    </div>
  )
}

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  entriesPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
}

export default TableComponent
