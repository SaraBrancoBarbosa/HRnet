import PropTypes from "prop-types"
import { Fragment, useCallback, useMemo, useState } from "react"
import ModalComponent from "../modal/Modal"
import SearchBar from "./SearchBar"
import usePagination from "./pagination/usePagination"
import Pagination from "./pagination/Pagination"
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

// Sort indépendant
const getSortedData = (currentRows, sort) => {
  if (sort.direction === "asc") {
    return currentRows.sort((a, b) => (a[sort.dataToSort] > b[sort.dataToSort] ? 1 : -1))
  }
  return currentRows.sort((a, b) => (a[sort.dataToSort] > b[sort.dataToSort] ? -1 : 1))
}

function TableComponent({ 
  headers, 
  rows,   
  deleteRow 
}) {
  
  // To format the columns
  const columnHeaders = useMemo(() => ([
    {
      name: "internalIndex", 
      visible: false,
      filterable: false,
      type: "number"
    },
    ...headers.map(header => {
      const value = typeof header === "string"
        ? {name: header, type: "string", visible:true} 
        : {...header, visible: header.visible !== undefined ? header.visible: true}

      return value
    })
  ]),[headers])

  const filterableColumns = useMemo(() => (
    columnHeaders.filter(header => header.filterable === true).map((_, index) => index)
  ), [columnHeaders])
  
  const [filterText, setFilterText] = useState("")

   // To filter the columns's data (search bar)
   const filteredRows = useMemo(() => (
    rows.filter((row) => {
      return filterableColumns.some((fieldIndex) => 
        row[fieldIndex].toLowerCase().includes(filterText.toLowerCase())
      )
    }).map((row, internalIndex) => ([internalIndex, ...row]))
  ), [filterText, filterableColumns, rows])

  // To open the "confirm deletion" modal
  const [rowToDelete, setRowToDelete] = useState(null)

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const paginationProps = usePagination({itemsPerPage: rowsPerPage, totalItems: filteredRows.length})
  const {
    currentItemIndex, 
    itemsPerPage, 
    totalItems, 
    setCurrentPage,
  } = paginationProps

  // To get the current rows
  const currentRows = useMemo(() => (
   filteredRows.slice(currentItemIndex, Math.min(currentItemIndex + itemsPerPage, totalItems - 1))
  ), [filteredRows, currentItemIndex, itemsPerPage, totalItems])

  // Sort management
  const [sort, setSort] = useState({ dataToSort: columnHeaders, direction: "asc" })

  // Filter management (search bar)
  const handleFilterChange = useCallback((e) => {
    setFilterText(e.target.value)
    setCurrentPage(1)
  }, [setFilterText, setCurrentPage])

  // To handle the entries to show
  const handleRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(0)
  },[setRowsPerPage, setCurrentPage])

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

  // Sort
  const handleColumnSort = () => {
    setSort({
      dataToSort: filterableColumns.name,
      direction:
        filterableColumns.name === sort.dataToSort ? sort.direction === "asc" ? "desc" : "asc" : "desc"
    })
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
            {columnHeaders.map((column, index) => (
              <Fragment key={`column-${index}`}>{column.visible && (
                <th key={index} onClick={() => handleColumnSort(column)}>
                  {column.name}
                  <span className="sort-symbol">
                    {sort.dataToSort === column.name ? (sort.direction === "asc" ? " ↑" : " ↓") : " O"}
                  </span>
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
          {getSortedData(currentRows, sort).map((row, index) => (
            <tr key={index} role="row" className="row">
              {row.map((field, fieldIndex) => (
                <Fragment key={`row-${fieldIndex}`}>{columnHeaders[fieldIndex].visible && (
                  <td>
                    <Column column={columnHeaders[fieldIndex]} value={field} />
                  </td>
                )}</Fragment>
              ))}

              {/* Button to delete the row data. The 9th row is used for the data id */}
              {deleteRow && (
                <td style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                  {/* Opens the "confirm deletion" modal */}
                  <button onClick={() => setRowToDelete(row)}
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
            {...paginationProps}
          />
      </div>

      {/* Modal when deleting an employee: confirm deletion */}
      <ModalComponent
        //To open the modal only when a row is about to be deleted
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
