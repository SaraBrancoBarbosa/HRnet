import PropTypes from "prop-types"
import { Fragment, useState } from "react"
import ModalComponent from "../modal/Modal"
import "./table.css"

// Date conversion 
Date.prototype.tableDate = function() {
  const month = (""+(this.getMonth()+1)).padStart(2,"0")
  const day = (""+this.getDate()).padStart(2,"0")
  const year = this.getFullYear()

  return [year,month,day].join("/")
}

// Column component
const Column = ({column, value}) => {
  if(column.type === "date") return value instanceof Date ? value.tableDate() : value.toString()
  if(column.type === "number") return "" +value
  if(!(typeof value === "string")) return JSON.stringify(value)

  return value
}

function TableComponent({ 
  columns, 
  rows,  
  pagination, 
  entriesPerPage, 
  onPageChange, 
  deleteRow 
}) {
  
  const [filterText, setFilterText] = useState("")

  // For the "confirm deletion" modal
  const [rowToDelete, setRowToDelete] = useState(null)

  // To format the columns
  columns = columns.map(column => {
    const value = typeof column === "string"
      ? {name: column, type: "string", visible:true} 
      : {...column, visible: column.visible !== undefined ? column.visible: true}

    return value
  })

  const filterableColumns = columns.filter(column => column.filterable === true).map((column, index) => index)

  // Filter management (search bar)
  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }
  // To filter the columns's data (search bar)
  const filteredRows = rows.filter((row) => {
    return filterableColumns.some((fieldIndex) => 
      row[fieldIndex].toLowerCase().includes(filterText.toLowerCase())
    )
  })

  // To leave the delete modal without deleting the data
  const handleCancelDelete = () => {
    setRowToDelete(null)
  }

  // To delete the row data
  const handleDeleteConfirm = () => {
    if (rowToDelete !== null) {
      deleteRow(rowToDelete)
      setRowToDelete(null)
    }
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
              <Fragment key={`column-${index}`}>{column.visible && (
                <th>
                  {column.name}
                </th>
              )}</Fragment>
            ))}
            {deleteRow && (
              <th key="button-delete">
                Delete
              </th>
            )}
          </tr>
        </thead>

        {/* To display the data (one row for each group of elements) */}
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index} role="row" className="row">
              {row.map((field, fieldIndex) => (
                <Fragment key={`row-${fieldIndex}`}>{columns[fieldIndex].visible && (
                  <td>
                    <Column column={columns[fieldIndex]} value={field} />
                  </td>
                )}</Fragment>
              ))}

              {/* Button to delete the row data. The 9th row is used for the data id */}
              {deleteRow && (
                <td>
                  {/* Opens the "confirm deletion" modal */}
                  <button onClick={() => setRowToDelete(row[9])} 
                    type="button" 
                    className="button button-delete" 
                  >
                    X
                  </button>
                </td>
              )}
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

      {/* Modal when deleting an employee: confirm deletion */}
      <ModalComponent
        //To open the modal only when a row is going to be deleted
        isOpen={rowToDelete !== null}
        onRequestClose={handleCancelDelete}
        title="Confirm Deletion"
        message="Are you sure you want to definitely delete this employee?"
      >
        <button onClick={handleDeleteConfirm} className="button" style={{backgroundColor:"red"}}>Delete</button>
        <button onClick={handleCancelDelete} className="button">Cancel</button>
      </ModalComponent>

    </div>
    
  )
}

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  filterableColumns: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  entriesPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
}

export default TableComponent
