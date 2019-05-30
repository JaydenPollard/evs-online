import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import { withFirebase } from "../../components/Firebase";
import FormField from "./formFields";
import { FormGroup } from "@material-ui/core";

class AddressForm extends Component {
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
                        id={"firstname"}
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
                        id={"lastname"}
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
                        id={"dob"}
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
                        id={"address"}
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
                        id={"phonenumber"}
                        formdata={this.props.formState.formdata.phonenumber}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
            </FormGroup>
        );
    }
}

const AddressComposed = compose(withFirebase)(AddressForm);

export default withStyles(registrationPageLayoutStyles)(AddressComposed);
