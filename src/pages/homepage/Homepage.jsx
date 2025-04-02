import "./homepage.css"

function Homepage() {
  return (
    <div className="homepage-container">
      
      <h1>HRnet</h1>
      <h2>Create Employee</h2>

      <form id="create-employee">
          <label htlmfor="first-name">First Name</label>
          <input type="text" id="first-name" />

          <label htlmfor="last-name">Last Name</label>
          <input type="text" id="last-name" />

          <label htlmfor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="text" />

          <label htlmfor="start-date">Start Date</label>
          <input id="start-date" type="text" />

          <fieldset className="address">
              <legend>Address</legend>

              <label htlmfor="street">Street</label>
              <input id="street" type="text" />

              <label htlmfor="city">City</label>
              <input id="city" type="text" />

              <label htlmfor="state">State</label>
              <select name="state" id="state"></select>

              <label htlmfor="zip-code">Zip Code</label>
              <input id="zip-code" type="number" />
          </fieldset>

          <label htlmfor="department">Department</label>
          <select name="department" id="department">
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
          </select>
      </form>

      <button className="button">Save</button>

    </div>
  )
}

export default Homepage
