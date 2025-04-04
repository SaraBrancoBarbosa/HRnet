import DatePicker from "react-datepicker"
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
  
  export default DatePickerComponent