import { useState, useEffect } from "react"

const useFetchStates = () => {
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadStates = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch("data/states.json")
                const data = await response.json()
                setStates(data.states)
                setLoaded(true)
            } catch (error) {
                console.error("Failed to load the states:", error)
                setError("Error!")
            } finally {
                setLoading(false)
            }
        }
        loadStates()
    }, [])

    return {
        states,
        loading,
        loaded,
        error
    }
}

export default useFetchStates
