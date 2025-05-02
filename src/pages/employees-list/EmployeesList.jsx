import { useContext, useEffect, useState } from "react"
import Context from "../../api/employee-context/ApiContext"
import TableComponent from "../../components/react-table-component/Table"
import ModalComponent from "../../components/modal/Modal"
import "./employeesList.css"

const headers = [
  // For the search bar, the filter is used on the first name and last name only
  {name:"First Name", filterable: true},
  {name:"Last Name", filterable: true},
  {name:"Date of Birth", type:"date"},
  "Department",
  {name:"Start Date", type:"date"},
  "Street",
  "City",
  "State",
  {name:"Zip Code", type:"number"},
  {name:"Id", type:"string", visible:false}
]

// To use the modal from the react-modal library
const customModal = (props) => (
  <ModalComponent {...props}>
    {props.children}
  </ModalComponent>
)

function EmployeesListPage() {

  // To get the employees + the deleteEmployee function from the Context
  const { employees, deleteEmployee } = useContext(Context)

  // !!!To delete after the app dev!!! => employees mocked data (to test the pagination and filter system)
  const [mockedEmployees, setMockedEmployees] = useState([])

  // To fetch the mocked data => 500 employees
  useEffect(() => {
    fetch("data/mock-data-employees.json")
      .then((response) => response.json())
      .then((data) => setMockedEmployees(data.employeesList || []))
      .catch((error) => console.error("Failed to load the employees mocked data", error))
  }, [employees])

  const mergedEmployees = [...employees, ...mockedEmployees]

  // The employees data => mergedEmployees will be "employees" once the mocked data are deleted
    const data = mergedEmployees.map((employee) => [
    employee.firstName,
    employee.lastName,
    employee.dateOfBirth,
    employee.department,
    employee.startDate,
    employee.street,
    employee.city,
    employee.state,
    employee.zipCode,
    employee.id,
  ])

  return (
    <div className="employee-list-container">
      <h1>Current Employees</h1>

      <TableComponent 
        headers={headers} 
        rows={data} 
        deleteRow={deleteEmployee}
        modalComponent={customModal}
      />

    </div>
  )
}

export default EmployeesListPage
