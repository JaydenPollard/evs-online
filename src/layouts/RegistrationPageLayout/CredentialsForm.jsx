import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import { withFirebase } from "../../components/Firebase";
import FormField from "./formFields";
import { FormGroup } from "@material-ui/core";
import { validateNextForm, validateRegisterForm } from "./validate";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class CredentialsForm extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (validateNextForm(nextProps.formState)) {
            alert("nextState nextFormValid: true");
            this.props.handleButtonEnable();
            if (validateRegisterForm(nextProps.formState)) {
                this.props.handleButtonEnable();
                alert("nextState registerFormValid: true");
                return true;
            } else {
                alert("nextState registerFormValid: false");
            }
        } else {
            alert("nextState nextFormValid: false");
        }
        return true;
    }

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
                        id={"email"}
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
                        id={"password"}
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
                        id={"repeatpassword"}
                        formdata={this.props.formState.formdata.repeatpassword}
                        change={element => this.props.handleUpdate(element)}
                    />
                </FormControl>
                <Grid container justify="center" alignItems="center">
                    <Button
                        className={this.props.classes.button}
                        variant="contained"
                        color="inherit"
                        size="large"
                        onClick={this.props.handleNext}
                        disabled={!this.props.formState.formNextValid}
                    >
                        Next
                    </Button>
                </Grid>
            </FormGroup>
        );
    }
}

const CredentialsComposed = compose(withFirebase)(CredentialsForm);

export default withStyles(registrationPageLayoutStyles)(CredentialsComposed);
