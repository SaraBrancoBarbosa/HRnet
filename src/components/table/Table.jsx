import PropTypes from "prop-types"
import "./table.css"
import { useState } from "react"

function TableComponent({ 
  columns, 
  data, 
  filterableColumns, 
  pagination, 
  entriesPerPage, 
  onPageChange, 
  deleteData 
}) {
  
  const [filterText, setFilterText] = useState("")

  // Filter management (search bar)
  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }

  // To filter the columns's data (search bar)
  const filteredData = data.filter((dataElement) => {
    return filterableColumns.some((colIndex) => 
      dataElement[colIndex].toLowerCase().includes(filterText.toLowerCase())
    )
  })

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
            <input 
              type="search" 
              placeholder="" 
              value={filterText} 
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>

      {/* Table */}
      <table id="table" role="grid">
        
        {/* Columns names (first row) */}
        <thead>
          <tr role="row">
            {columns.map((column, index) => (
              <th key={index}>
                {column}
              </th>
            ))}
          </tr>
        </thead>

        {/* To display the data (one row for each group of elements) */}
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} role="row">
              {/* We "remove" the last column containing the id => the delete button takes its place */}
              {row.slice(0, -1).map((field, fieldIndex) => (
                <td key={fieldIndex}>{field}</td>
              
                // Without removing the last column:
                //{row.map((field, fieldIndex) => (
              ))}

              {/* Button to delete the row data. The 9th row is used for the data id */}
              <td>
                <button onClick={() => handleDelete(row[9])} className="button" style={{alignItems:"center", height:"15px", width:"60px"}}>Delete</button>
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
            onClick={() => onPageChange(pagination.prevPage)}
            id="table_previous"
          >
            Previous
          </a>

          <span>
            <a onClick={() => onPageChange(pagination.nextPage)}>
              {pagination.currentPage}
            </a>
          </span>

          <a onClick={() => onPageChange(pagination.nextPage)} 
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
  filterableColumns: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  entriesPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
}

export default TableComponent
