import * as React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropType from "prop-types";

/**
 * Allows users to pick a date, which then updates the date property inside an object with the new date value
 * @author Joshua (Chang-You) Wu
 */
const CustomDatePicker = props => {
    // Destructure props
    const { id, name, label, setDate, value } = props;
    // Handle date changes
    function handleDateChange(date) {
        // Update the object with the new date
        setDate(data => {
            return { ...data, [props.name]: date };
        });
    }
    // Render the view
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                required
                keyboard
                clearable
                id={id}
                name={name}
                label={label}
                onChange={handleDateChange}
                value={value}
                format="dd/MM/yyyy"
                style={{ width: "100%" }}
            />
        </MuiPickersUtilsProvider>
    );
};

// Declare prop types and enforce data type
CustomDatePicker.propTypes = {
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    label: PropType.string.isRequired,
    setDate: PropType.func.isRequired,
    value: PropType.object.isRequired
};

export default CustomDatePicker;
