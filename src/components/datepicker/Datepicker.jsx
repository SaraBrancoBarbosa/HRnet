import DatePicker from "react-datepicker"
import PropTypes from "prop-types"
import "react-datepicker/dist/react-datepicker.css"

function DatePickerComponent({ selectedDate, onChange, id, label }) {
    return (
      <div className="label-input">
        <label htmlFor={id}>{label}</label>
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          id={id}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
      </div>
    )
  }
  
  DatePickerComponent.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }

  export default DatePickerComponent