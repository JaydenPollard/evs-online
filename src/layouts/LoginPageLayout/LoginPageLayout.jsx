import Avatar from "@material-ui/core/Avatar";
import React, { Component } from "react";
import { validate } from "./validate";
import FormField from "./formFields";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { loginPageLayoutStyles } from "./LoginPageLayoutStyles";
import Image from "../../assests/popcorn-login-background.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import {firebase} from '../firebase';
class LoginPage extends Component {
    constructor(props) {
        super(props);
        const { classes } = props;
    }
    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            email: {
                element: "input",
                value: "",
                config: {
                    name: "email_input",
                    label: "Email address",
                    type: "email",
                    placeholder: "Enter your email address: *"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: "",
                showlabel: true
            },
            password: {
                element: "input",
                value: "",
                config: {
                    name: "password_input",
                    type: "password",
                    label: "Password",
                    placeholder: "Enter your password: *"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: "",
                showlabel: true
            }
        }
    };
    updateForm(element) {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }
    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
    }

    render() {
        return (
            <div className={this.props.classes.background}>
                <main className={this.props.classes.main}>
                    <CssBaseline />
                    <Paper className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar} />
                        <Typography component="h1" variant="h5">
                            {" "}
                            Log in{" "}
                        </Typography>
                        <form
                            className={this.props.classes.form}
                            onSubmit={event => this.submitForm(event)}
                        >
                            <FormControl margin="normal" required fullWidth>
                                <FormField
                                    id={"email"}
                                    formdata={this.state.formdata.email}
                                    change={element => this.updateForm(element)}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <FormField
                                    id={"password"}
                                    formdata={this.state.formdata.password}
                                    change={element => this.updateForm(element)}
                                />
                            </FormControl>
                            {this.state.formError ? (
                                <div className="error_label">
                                    Something is wrong, try again
                                </div>
                            ) : null}
                            <button
                                onClick={event => this.submitForm(event)}
                                fullWidth
                                variant="contained"
                                color="inherit"
                                className={this.props.classes.submit}
                            >
                                Log In
                            </button>
                            <div> {this.state.formSuccess} </div>
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(loginPageLayoutStyles)(LoginPage);
