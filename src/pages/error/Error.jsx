import { Link, useLocation } from "react-router-dom"
import "./error.css"

function ErrorPage() {

    const location = useLocation()
    const state = location ?.state
    const {code, message} = state ?? {code: "404", message: undefined}
    console.log(code, message)
    
    return (
        <div className="error">
            <h1>{code ?? "404"}</h1>
            <h2>{message ?? (code==="404" ? <>Oops! The page you are looking for does not exist.</> : "")}</h2>
            <Link to="/">
                <h3>Go back to the homepage</h3>
            </Link>
        </div>     
    )
}

export default ErrorPage