import Select from "react-select"
import PropTypes from "prop-types"
import { useRef } from "react"

const customStyles = {
  control: (baseStyles, state) => {
    const baseControl = {
      ...baseStyles,
      height: 21,
      minHeight: 21,
      maxWidth: 186,
      minWidth: 186,
      alignContent: "center",
      borderColor: state.isFocused ? "#0060DF" : "#767676",
      boxShadow: state.isFocused ? "0 0 0 1px #0060DF" : "none",
      borderRadius: 2,
      paddingLeft: 0,
      fontSize: 13,
      "&:hover": {
        borderColor: state.isFocused ? "#0060DF" : "#767676", 
      }
    }

    // To standardise the border color with the other Chrome's inputs
    const chromeSpecificStyles = {
      "@supports (-webkit-appearance: none)": {
        boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
        borderColor: state.isFocused ? "#000000" : "none",
        "&:hover": {
          borderColor: state.isFocused ? "#000000" : "#767676", 
        }
      }
    }

    return { ...baseControl, ...chromeSpecificStyles }
  },

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    marginTop: 10,
    marginBottom: 10
  })
}

function DropdownComponent({ id, label, options, isLoading, isDisabled, onChange, value }) {
  
  const selectRef = useRef(null)

  return (
    <Select
      ref={selectRef}
      id={id}
      label={label}
      options={options}
      isLoading={isLoading}
      isDisabled={isDisabled}
      placeholder={isLoading ? "Loading..." : `Select a ${label.toLowerCase()}`}
      getOptionLabel={(e) => e.label}
      menuPlacement="auto"
      styles={customStyles}
      onChange={(selected) => onChange(selected ? selected.value : null)}
      value={options.find(option => option.value === value) || null}
    />
  )
}

DropdownComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
}

export default DropdownComponent
