import { useState } from "react"
import ModalComponent from "../../components/modal/Modal"
import DatePickerComponent from "../../components/datepicker/Datepicker"
import "./createEmployee.css"

function CreateEmployeePage() {

  // Modal management
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // Datepicker management
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [startDate, setStartDate] = useState(null)

  function handleSubmit (e) {
    e.preventDefault()
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="create-employee-container">
      
      <h1>Create Employee</h1>

      <form id="create-employee" onSubmit={handleSubmit}>

        <div className="labels-divs">
          {/* Faire un composant de ça */}
          <div className="label-input">
            <label htlmfor="first-name">First Name</label>
            <input type="text" id="first-name" />
          </div>

          <div className="label-input">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" />
          </div>

          {/* The 2 datepickers: Date of birth and Start date */}
          <DatePickerComponent 
            selectedDate={dateOfBirth}
            onChange={setDateOfBirth}
            id="date-of-birth"
            label="Date of Birth"
          />

          <DatePickerComponent 
            selectedDate={startDate}
            onChange={setStartDate}
            id="start-date"
            label="Start Date"
          />

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
          </div>

        <button type="submit" className="button">Save</button>
        
      </form>

       {/* Modal component after submitting a new employee */}
       <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} />

    </div>
  )
}

export default CreateEmployeePage
