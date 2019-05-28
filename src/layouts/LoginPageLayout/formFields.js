import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
const FormField = ({ formdata, id, change }) => {
    const showError = () => {
        let errorMessage = (
            <div className="error_label">
                {formdata.validation && !formdata.valid
                    ? formdata.validationMessage
                    : null}
            </div>
        );
        return errorMessage;
    };

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case "input":
                formTemplate = (
                    <FormControl margin="normal" required fullWidth>
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
                            autoFocus
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
