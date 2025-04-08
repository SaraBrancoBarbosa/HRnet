import { useState } from "react"
import { useForm } from "react-hook-form"
import ModalComponent from "../../components/modal/Modal"
import DatePickerComponent from "../../components/datepicker/Datepicker"
import "./createEmployee.css"
import useFetchStates from "../../api/useFetchStates"
import useFetchDepartments from "../../api/useFetchDepartments"

function CreateEmployeePage() {

  // Form management with react-hook-form
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors, isSubmitting } } = useForm()

  // Modal management
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // Datepicker management
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [startDate, setStartDate] = useState(null)

  // Using the fetch API to get the states
  const { states, loading:loadingStates, loaded:loadedStates, error:errorStates } = useFetchStates()
  // Using the fetch API to get the departments
  const { departments, loading:loadingDepartments, loaded:loadedDepartments, error:errorDepartments } = useFetchDepartments()

  // For handleSubmit
  const onSubmit = async (data) => {
    // Timeout for the user to know that the submit is loading
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    setModalIsOpen(true)
  }

  // Setting values for date pickers with react-hook-form
  const handleDateChange = (name, setter, date) => {
    setter(date)
    setValue(name, date)
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="create-employee-container">
      
      <h1>Create Employee</h1>

      <form id="create-employee" onSubmit={handleSubmit(onSubmit)}>

        <div className="labels-divs">

          {/* First name */}
          <div className="label-input">
            <label htlmfor="first-name">First Name</label>
            <input 
              {...register("first-name", { 
                required: "The first name is required.",
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
                  message: "Invalid characters."
                },
                minLength: {
                  value: 2,
                  message: "Please enter at least 2 characters."
                }
              })} 
              type="text" 
              id="first-name"
            />
            {errors["first-name"] && (
              <div className="error-message">{errors["first-name"].message}</div>
            )}
          </div>

          {/* Last name */}
          <div className="label-input">
            <label htmlFor="last-name">Last Name</label>
            <input 
              {...register("last-name", { 
                required: "The last name is required.",
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
                  message: "Invalid characters."
                },
                minLength: {
                  value: 2,
                  message: "Please enter at least 2 characters."
                }
              })} 
              type="text" 
              id="last-name"
            />
            {errors["last-name"] && (
              <div className="error-message">{errors["last-name"].message}</div>
            )}
          </div>

          {/* The 2 datepickers: Date of birth and Start date */}
          <div className="label-input">
            <DatePickerComponent 
              selectedDate={dateOfBirth}
              onChange={(date) => handleDateChange("date-of-birth", setDateOfBirth, date)}
              id="date-of-birth"
              label="Date of Birth"
              //{...register("date-of-birth", { required: "The date of birth is required." })}
            />
            {errors["date-of-birth"] && (
              <div className="error-message">{errors["date-of-birth"].message}</div>
            )}
          </div>

          <div className="label-input">
            <DatePickerComponent 
              selectedDate={startDate}
              onChange={(date) => handleDateChange("startDate", setStartDate, date)}
              id="start-date"
              label="Start Date"
              //{...register("start-date", { required: "The starting date is required." })}
            />
            {errors["start-date"] && (
              <div className="error-message">{errors["start-date"].message}</div>
            )}
          </div>

            {/* Address */}
            <fieldset className="address">
                <legend>Address</legend>

                 {/* Street */}
                <div className="label-input">
                  <label htmlFor="street">Street</label>
                  <input
                    {...register("street", { required: "The street address is required." })}
                    id="street" 
                    type="text"
                  />
                  {errors["street"] && (
                    <div className="error-message">{errors["street"].message}</div>
                  )}
                </div>

                {/* City */}
                <div className="label-input">
                  <label htmlFor="city">City</label>
                  <input
                    {...register("city", { 
                      required: "The city address is required.",
                      pattern: {
                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
                        message: "Invalid characters."
                      },
                      minLength: {
                        value: 2,
                        message: "Please enter at least 2 characters."
                      }
                    })}
                    id="city" 
                    type="text"
                  />
                  {errors["city"] && (
                    <div className="error-message">{errors["city"].message}</div>
                  )}
                </div>

                {/* State */}
                <div className="label-input">
                  <label htmlFor="state">State</label>
                  <select 
                    {...register("state", { required: "The state address is required." })} 
                    name="state" 
                    id="state"
                  >
                    <option value="" disabled selected>Select a state</option>
                    {/* The fetched states with the loading, error and loaded management */}
                    {loadingStates && <option>Loading states...</option>}
                    {errorStates && <option>{errorStates}</option>}
                    {loadedStates && states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors["state"] && (
                    <div className="error-message">{errors["state"].message}</div>
                  )}
                </div>

                {/* Zip Code */}
                <div className="label-input">
                  <label htmlFor="zip-code">Zip Code</label>
                  <input
                    {...register("zip-code", { 
                      required: "The zip code is required.",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Invalid characters."
                      },
                    })}
                    id="zip-code" 
                    type="text"
                  />
                  {errors["zip-code"] && (
                    <div className="error-message">{errors["zip-code"].message}</div>
                  )}
                </div>

            </fieldset>

            {/* Department */}
            <div className="label-input">
              <label htlmfor="department">Department</label>
              <select 
                {...register("department", { required: "The department is required." })}
                name="department" 
                id="department"
              >
                <option value="" disabled selected>Select a department</option>
                {/* The fetched departments with the loading, error and loaded management */}
                {loadingDepartments && <option>Loading departments...</option>}
                {errorDepartments && <option>{errorDepartments}</option>}
                {loadedDepartments && departments.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errors["department"] && (
                <div className="error-message">{errors["department"].message}</div>
              )}
            </div>
          </div>

        <button disabled={isSubmitting} type="submit" className="button">
          {isSubmitting ? "Loading..." : "Save"}
        </button>
        
      </form>

       {/* Modal component after submitting a new employee */}
       <ModalComponent isOpen={modalIsOpen} onRequestClose={closeModal} />

    </div>
  )
}

export default CreateEmployeePage
