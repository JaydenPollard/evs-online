import * as React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

const MoneyTextField = props => {
    const { inputRef, onChange, ...others } = props;
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
        />
    );
};

export default MoneyTextField;
