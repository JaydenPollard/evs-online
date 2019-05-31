import { registrationPageLayoutStyles } from "../../layouts/RegistrationPageLayout/RegistrationPageLayoutStyles";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormField from "./FormFields";
import { FormGroup } from "@material-ui/core";

// Form for filling out personal details, includes custom FormFields for each input and helper text
class PersonalDetailsForm extends Component {
    render() {
        return (
            <FormGroup>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.firstname.valid}
                >
                    <FormField
                        id="firstname"
                        formdata={this.props.formState.formdata.firstname}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.lastname.valid}
                >
                    <FormField
                        id="lastname"
                        formdata={this.props.formState.formdata.lastname}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.dob.valid}
                >
                    <FormField
                        id="dob"
                        formdata={this.props.formState.formdata.dob}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.address.valid}
                >
                    <FormField
                        id="address"
                        formdata={this.props.formState.formdata.address}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={this.props.formState.formdata.phonenumber.valid}
                >
                    <FormField
                        id="phonenumber"
                        formdata={this.props.formState.formdata.phonenumber}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
            </FormGroup>
        );
    }
}

// Declare PropTypes
PersonalDetailsForm.propTypes = {
    formState: PropTypes.object,
    handleUpdate: PropTypes.func
};

export default withStyles(registrationPageLayoutStyles)(PersonalDetailsForm);
