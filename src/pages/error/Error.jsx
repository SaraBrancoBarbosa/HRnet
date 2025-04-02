import { Link, useLocation } from "react-router-dom"
import "./error.css"

function Error() {

    const location = useLocation()
    const state = location ?.state
    const {code, message} = state ?? {code: "404", message: undefined}
    console.log(code, message)
    
    return (
        <div className="error">
            <h1>{code ?? "404"}</h1>
            <h2>{message ?? (code==="404" ? <>Oups ! La page que vous demandez n&apos;existe pas.</> : "")}</h2>
            <Link to="/">
                <h3>Retourner sur la page d&apos;accueil</h3>
            </Link>
        </div>     
    )
}

export default Error