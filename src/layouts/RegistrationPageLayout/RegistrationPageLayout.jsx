import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { validate } from "./validate";
import { Link } from "react-router-dom";
import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";
import { withFirebase } from "../../components/Firebase";

const INITIAL_STATE = {
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

const RegistrationPage = () => {
    <div>
        <FirebaseContext.Consumer>
            {firebase => <RegistrationPageLayout firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>;
};

class RegistrationPageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };
    }
    handleChange = element => {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };
        newElement.value = element.event.target.value;
        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };
    handleSubmit = event => {
        console.log("handling submit click");
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        let email = this.state.formdata.email.value;
        let password = this.state.formdata.password.value;

        Firebase.doCcreateUserWithEmailAndPassword(email, password).catch(
            function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/weak-password") {
                    alert("The password is too weak.");
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            }
        );

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
    };
    render() {
        const isValid = newElement => {
            validate(newElement);
        };
        return (
            <div className={this.props.classes.background}>
                <main className={this.props.classes.main}>
                    <CssBaseline />
                    <Paper className={this.props.classes.paper}>
                        <Button
                            className={this.props.classes.button}
                            color="default"
                        >
                            <Link to="/home" style={{ textDecoration: "none" }}>
                                <ArrowBackIcon
                                    style={{ transform: "translateY(7px)" }}
                                />
                                Return
                            </Link>
                        </Button>

                        <Avatar className={this.props.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registration Form
                        </Typography>
                        <form className={this.props.classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">
                                    Email Address
                                </InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">
                                    Enter a password
                                </InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="repeat-password">
                                    Re-enter password
                                </InputLabel>
                                <Input
                                    name="repeat-password"
                                    type="password"
                                    id="repeat-password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="first-name">
                                    First Name
                                </InputLabel>
                                <Input
                                    name="first-name"
                                    type="text"
                                    id="first-name"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="last-name">
                                    Last Name
                                </InputLabel>
                                <Input
                                    name="last-name"
                                    type="text"
                                    id="last-name"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="date-of-birth">
                                    Date of Birth
                                </InputLabel>
                                <Input
                                    name="date-of-birth"
                                    type="dob"
                                    id="dob"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="inherit"
                                onClick={this.handleSubmit}
                                disabled={isValid(this)}
                            >
                                Register
                            </Button>
                        </form>
                        {/* <div className={this.props.classes.divider} /> */}
                    </Paper>
                </main>
            </div>
        );
    }
}

const RegistrationBase = withFirebase(RegistrationPage);

export default withStyles(registrationPageLayoutStyles)(RegistrationBase);
