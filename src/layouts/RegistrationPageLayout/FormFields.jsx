import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText } from "@material-ui/core";

const FormField = ({ formdata, id, change }) => {
    const showError = () => {
        let errorMessage = (
            <FormHelperText
                hidden={formdata.valid}
                error
                id="component-error-text"
            >
                <div className="error_label">
                    {formdata.validation && !formdata.valid
                        ? formdata.validationMessage
                        : null}
                </div>
            </FormHelperText>
        );
        return errorMessage;
    };

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case "input":
                formTemplate = (
                    <FormControl fullWidth>
                        <InputLabel>
                            {formdata.showlabel ? (
                                <div className="label_inputs">
                                    {formdata.config.label}
                                </div>
                            ) : null}
                        </InputLabel>
                        <Input
                            {...formdata.config}
                            value={formdata.value}
                            onChange={event => change({ event, id })}
                            id
                            name={formdata.config.type}
                        />
                        {showError()}
                    </FormControl>
                );
                break;

            case "date":
                formTemplate = (
                    <FormControl fullWidth>
                        <TextField
                            {...formdata.config}
                            id
                            name={formdata.config.type}
                            value={formdata.value}
                            onChange={event => change({ event, id })}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        {showError()}
                    </FormControl>
                );
                break;

            default:
                formTemplate = null;
        }
        return formTemplate;
    };

    return <div>{renderTemplate()}</div>;
};

export default FormField;
