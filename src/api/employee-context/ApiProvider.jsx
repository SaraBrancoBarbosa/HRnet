import PropTypes from "prop-types"
import ApiContext from "./ApiContext"
import { useEffect, useState } from "react"

/***** 
The provider of ApiContext
The provider encapsulates the children by providing the context : any component gets access to "mode" and its function to swap
*****/

// The initial list, which is empty for now
const initEmployees = {
    employees: [],
}

// To get the employees from the localStorage
const getInitialState = () => {
    const employees = localStorage.getItem("employees")
    // Get the employees data in the LS if they exist, if not => initial list
    return employees ? JSON.parse(employees) : initEmployees
}

const ApiProviderEmployees = ({ children }) => {
    const [employees, setEmployees] = useState(getInitialState)

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees))
    }, [employees])

    const addEmployee = (employee) => {
        setEmployees((prev) => ({
            ...prev,
            employees: [...prev.employees, employee],
        })) 
    }

    const deleteEmployee = (employeeId) => {
        setEmployees((prev) => ({
            ...prev,
            employees: prev.employees.filter(employee  => employee .id !== employeeId)
        }))
    }

    return <ApiContext.Provider value={{addEmployee, deleteEmployee, ...employees }}>
        {children}
    </ApiContext.Provider>
}

ApiProviderEmployees.propTypes = {
    children: PropTypes.node
}

export default ApiProviderEmployees