import { useState } from "react"
import ModalComponent from "../../components/modal/Modal"
import "./createEmployee.css"

function CreateEmployeePage() {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleSubmit (e) {
    e.preventDefault()
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  console.log(modalIsOpen)

  return (
    <div className="create-employee-container">
      
      <h1>Create Employee</h1>

      <form id="create-employee" onSubmit={handleSubmit}>

        {/* Faire un composant de ça */}
        <div className="label-input">
          <label htlmfor="first-name">First Name</label>
          <input type="text" id="first-name" />
        </div>

        <div className="label-input">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
        </div>

        <div className="label-input">
          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" />
        </div>

        <div className="label-input">
          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="text" />
        </div>

          {/* Address */}
          <fieldset className="address">
              <legend>Address</legend>

              <div className="label-input">
                <label htmlFor="street">Street</label>
                <input id="street" type="text" />
              </div>

              <div className="label-input">
                <label htmlFor="city">City</label>
                <input id="city" type="text" />
              </div>

              <div className="label-input">
                <label htmlFor="state">State</label>
                <select name="state" id="state"></select>
              </div>

              <div className="label-input">
                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" type="number" />
              </div>
          </fieldset>

          {/* Department */}
          <label htlmfor="department">Department</label>
          <select name="department" id="department">
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
          </select>

        <button type="submit" className="button">Save</button>
        
      </form>

       {/* Modal component after submitting a new employee */}
       <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} />

    </div>
  )
}

export default CreateEmployeePage
