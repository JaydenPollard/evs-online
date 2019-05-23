import * as React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

const CustomDatePicker = props => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                required
                keyboard
                clearable
                id={props.id}
                name={props.name}
                label={props.label}
                onChange={date =>
                    props.setDate(prev => {
                        return { ...prev, [props.name]: date };
                    })
                }
                value={props.value}
                format="dd/MM/yyyy"
                style={{ width: "100%" }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default CustomDatePicker;
