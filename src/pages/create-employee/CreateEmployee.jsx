import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import EmployeeContext from "../../api/employee-context/ApiContext"
import ModalComponent from "../../components/modal/Modal"
import DatePickerComponent from "../../components/datepicker/Datepicker"
import useFetchStates from "../../api/useFetchStates"
import useFetchDepartments from "../../api/useFetchDepartments"
import DropdownComponent from "../../components/dropdown/Dropdown"
import "./createEmployee.css"

function CreateEmployeePage() {

  // To get the addEmployee function from the API
  const { addEmployee } = useContext(EmployeeContext)

  // Form management with react-hook-form
  const { 
    register, 
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm()

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
    
    // To create a new employee using the form data
    const newEmployee = {
      firstName: data["first-name"],
      lastName: data["last-name"],
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      street: data["street"],
      city: data["city"],
      state: data["state"],
      zipCode: data["zip-code"],
      department: data["department"],
      // The timestamp is the employee's unique ID
      id: Date.now()
    }

    // Then this new employee is added to the list by using the API
    addEmployee(newEmployee)
    
    // To be sure all the elements are reseted correctly after submission
    reset({
    "first-name": "",
    "last-name": "",
    "date-of-birth": null,
    "start-date": null,
    "street": "",
    "city": "",
    "state": null,
    "zip-code": "",
    "department": null
  })
  
  // To reinitialise the components value (DatePickers)
  setDateOfBirth(null)
  setStartDate(null)
  
  setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <div className="create-employee-container">
      
      <h1>Create Employee</h1>

      <form id="create-employee" onSubmit={handleSubmit(onSubmit)}>

        <div className="labels-divs">

          {/* First name */}
          <div className="label-input" aria-labelledby="first-name">
            <label id="first-name">First Name</label>
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
              placeholder="Enter the first name"
            />
            {errors["first-name"] && (
              <div className="error-message">{errors["first-name"].message}</div>
            )}
          </div>

          {/* Last name */}
          <div className="label-input" aria-labelledby="last-name">
            <label id="last-name">Last Name</label>
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
              placeholder="Enter the last name"
            />
            {errors["last-name"] && (
              <div className="error-message">{errors["last-name"].message}</div>
            )}
          </div>

          {/* The 2 datepickers: Date of birth and Start date */}
          <div className="label-input" aria-labelledby="date-of-birth">
          {/* Controller is used for customised components (libraries) */}
          <Controller
            name="date-of-birth"
            control={control}
            rules={{ required: "The date of birth is required." }}
            render={({ field }) => (
              <DatePickerComponent
                {...field}
                id="date-of-birth"
                label="Date of Birth"
                selectedDate={dateOfBirth}
                onChange={(date) => {
                  field.onChange(date)
                  setDateOfBirth(date)
                }}
              />
            )}
          />
            {errors["date-of-birth"] && (
              <div className="error-message">{errors["date-of-birth"].message}</div>
            )}
          </div>

          <div className="label-input" aria-labelledby="start-date">
          <Controller
            name="start-date"
            control={control}
            rules={{ required: "The starting date is required." }}
            render={({ field }) => (
              <DatePickerComponent
                {...field}
                id="start-date"
                label="Start Date"
                selectedDate={startDate}
                onChange={(date) => {
                  field.onChange(date)
                  setStartDate(date)
                }}
              />
            )}
          />
            {errors["start-date"] && (
              <div className="error-message">{errors["start-date"].message}</div>
            )}
          </div>

            {/* Address */}
            <fieldset className="address">
                <legend>Address</legend>

                 {/* Street */}
                <div className="label-input" aria-labelledby="street">
                  <label id="street">Street</label>
                  <input
                    {...register("street", { required: "The street address is required." })}
                    id="street" 
                    type="text"
                    placeholder="Enter the street"
                  />
                  {errors["street"] && (
                    <div className="error-message">{errors["street"].message}</div>
                  )}
                </div>

                {/* City */}
                <div className="label-input" aria-labelledby="city">
                  <label id="city">City</label>
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
                    placeholder="Enter the city"
                  />
                  {errors["city"] && (
                    <div className="error-message">{errors["city"].message}</div>
                  )}
                </div>

                {/* State */}
                <div className="label-input" aria-labelledby="state">
                  <label id="state">State</label>
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "The state address is required." }}
                    render={({ field }) => (
                      <DropdownComponent
                        {...field}
                        id="state"
                        label="State"
                        options={!errorStates && states.map(state => ({
                          label: state.name,
                          value: state.name
                        }))}
                        isLoading={loadingStates}
                        isDisabled={isSubmitting || !loadedStates}
                        clearValue={modalIsOpen}
                      />
                    )}
                  />
                  {errors["state"] && (
                    <div className="error-message">{errors["state"].message}</div>
                  )}
                </div>

                {/* Zip Code */}
                <div className="label-input" aria-labelledby="zip-code">
                  <label id="zip-code">Zip Code</label>
                  <input
                    {...register("zip-code", { 
                      required: "The zip code is required.",
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: "Zip code must be exactly 5 digits."
                      },
                    })}
                    id="zip-code" 
                    type="text"
                    placeholder="Enter the zip code"
                  />
                  {errors["zip-code"] && (
                    <div className="error-message">{errors["zip-code"].message}</div>
                  )}
                </div>

            </fieldset>

            {/* Department */}
            <div className="label-input" aria-labelledby="department">
              <label htlmfor="department">Department</label>
              <Controller
                name="department"
                control={control}
                rules={{ required: "The department is required." }}
                render={({ field }) => (
                  <DropdownComponent
                    {...field}
                    id="department"
                    label="Department"
                    options={!errorDepartments && departments.map(department => ({
                      label: department.name,
                      value: department.name
                    }))}
                    isLoading={loadingDepartments}
                    isDisabled={isSubmitting || !loadedDepartments}
                    clearValue={modalIsOpen}
                  />
                )}
              />
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
      <ModalComponent 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        title="Employee created!"
      >
        <button className="button" onClick={closeModal}>Close</button>
      </ModalComponent>

    </div>
  )
}

export default CreateEmployeePage
