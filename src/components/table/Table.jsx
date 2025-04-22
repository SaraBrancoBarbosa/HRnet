import PropTypes from "prop-types"
import { Fragment, useState } from "react"
import ModalComponent from "../modal/Modal"
import SearchBar from "./SearchBar"
import Pagination from "./Pagination"
import ShowEntriesOptions from "./ShowEntriesOptions"
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
  deleteRow 
}) {
  
  const [filterText, setFilterText] = useState("")

  // To open the "confirm deletion" modal
  const [rowToDelete, setRowToDelete] = useState(null)

  // Pagination management
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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

  // To get the current rows
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow)

  const pageNumbers = []
  const totalRows = filteredRows.length
  for(let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i)
  }

  // To change the page
  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  // To handle the entries to show
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

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

      <div className="entries-and-search">
        {/* To choose the number of entries to show per page */}
        <ShowEntriesOptions
          rowsPerPage={rowsPerPage} handleRowsPerPageChange={handleRowsPerPageChange}
        />
        
        {/* Search bar */}
        <SearchBar filterText={filterText} handleFilterChange={handleFilterChange} />
      </div>

      {/* Table */}
      <table role="grid">
        
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
          {currentRows.map((row, index) => (
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
                <td style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
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
          <Pagination
            indexOfFirstRow={indexOfFirstRow}
            indexOfLastRow={indexOfLastRow}
            totalRows={totalRows}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            handleChangePage={handleChangePage}
          />
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
  deleteRow: PropTypes.func.isRequired,
}

export default TableComponent
