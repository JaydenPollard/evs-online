import * as React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";
import PropType from "prop-types";

/**
 * Formats and displays the user input into a money format without altering the input values
 * @author Joshua (Chang-You) Wu
 */
const MoneyTextField = props => {
    // Destructure props
    const { inputRef, onChange, ...others } = props;
    // Render view
    return (
        <NumberFormat
            {...others}
            customInput={TextField}
            getInputRef={inputRef}
            onValueChange={numberValues => {
                onChange({
                    target: {
                        value: numberValues.value
                    }
                });
            }}
            thousandSeparator
            displayType="input"
            prefix="$"
            decimalScale={2}
        />
    );
};

// Declare prop types and enforce data type
MoneyTextField.propTypes = {
    inputRef: PropType.object,
    onChange: PropType.func.isRequired
};

export default MoneyTextField;
