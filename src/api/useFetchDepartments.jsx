import { useState, useEffect } from "react"

const useFetchDepartments = () => {
    const [departments, setDeparments] = useState([])
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch("data/departments.json")
                const data = await response.json()
                setDeparments(data.departments)
                setLoaded(true)
            } catch (error) {
                console.error("Failed to load the departments:", error)
                setError("Error!")
            } finally {
                setLoading(false)
            }
        }
        loadDepartments()
    }, [])

    return {
        departments,
        loading,
        loaded,
        error
    }
}

export default useFetchDepartments
