import PropTypes from "prop-types"
import ApiContext from "./ApiContext"
import { useEffect, useState } from "react"

/***** 
The provider of ApiContext
The provider encapsulates the children by providing the context : any component gets access to "mode" and its function to swap
*****/

// La liste de base (qu'on n'a pas pour l'instant)
const initEmployees = {
    employees: [],
}

// Pour récupérer les employés du localStorage
const getInitialState = () => {
    const employees = localStorage.getItem("employees")
    // Si on a des données dans le LS alors on les prend, sinon on prend la liste par défaut
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

    const removeEmployee = (employeeId) => {
        setEmployees((prev) => ({
            ...prev,
            employees: prev.employees.filter((p) => p.id !== employeeId)
        }))
    }

    return <ApiContext.Provider value={{addEmployee, removeEmployee, ...employees }}>
        {children}
    </ApiContext.Provider>
}

ApiProviderEmployees.propTypes = {
    children: PropTypes.node
}

export default ApiProviderEmployees