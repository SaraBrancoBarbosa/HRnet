import { useContext } from "react"
import Context from "../../api/employee-context/ApiContext"
import TableComponent from "../../components/table/Table"
import "./employeesList.css"

function EmployeesListPage() {

  // On récupère les employés du Context
  const { employees } = useContext(Context)
  // On récupère la fonction pour supprimer un employé depuis le Context
  const { deleteEmployee } = useContext(Context)

  const columns = [
    "First Name",
    "Last Name",
    "Date of Birth",
    "Department",
    "Start Date",
    "Street",
    "City",
    "State",
    "Zip Code",
    "Delete"
  ]

  // Les données des employés
  const data = employees.map((employee) => [
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
        columns={columns} 
        data={data} 
        pagination={""} 
        entriesPerPage={""} 
        onPageChange={""}
        deleteData={deleteEmployee}
      />

    </div>
  )
}

export default EmployeesListPage
