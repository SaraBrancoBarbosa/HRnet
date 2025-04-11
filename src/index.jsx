import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import ApiProviderEmployees from "./api/employee-context/ApiProvider.jsx"
import App from "./App.jsx"
import Modal from "react-modal"
import "./index.css"

Modal.setAppElement("#root")

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProviderEmployees>
      <App />
    </ApiProviderEmployees>
  </StrictMode>
)
