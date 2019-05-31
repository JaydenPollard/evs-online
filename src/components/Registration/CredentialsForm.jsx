import { registrationPageLayoutStyles } from "../../layouts/RegistrationPageLayout/RegistrationPageLayoutStyles";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormField from "./FormFields";
import { FormGroup } from "@material-ui/core";

// Form for filling out credentials, includes custom FormFields for each input and helper text
class CredentialsForm extends Component {
    render() {
        return (
            <FormGroup>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.email.valid}
                >
                    <FormField
                        id="email"
                        formdata={this.props.formState.formdata.email}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.password.valid}
                >
                    <FormField
                        id="password"
                        formdata={this.props.formState.formdata.password}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.repeatpassword.valid}
                >
                    <FormField
                        id="repeatpassword"
                        formdata={this.props.formState.formdata.repeatpassword}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
            </FormGroup>
        );
    }
}

// Declare PropTypes
CredentialsForm.propTypes = {
    formState: PropTypes.object,
    handleUpdate: PropTypes.func
};

export default withStyles(registrationPageLayoutStyles)(CredentialsForm);
