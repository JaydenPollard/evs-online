import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormField from "./FormFields";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { withFirebase } from "../../components/Firebase";
import { validate, validateRepeatPassword } from "./validate";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";
import { createUserWithAuth, createUserInDatabase } from "./auth";

const INITIAL_FORM_STATE = {
    formValid: false,
    formError: false,
    formSuccess: "",
    formdata: {
        email: {
            element: "input",
            value: "",
            config: {
                name: "email_input",
                label: "Enter your email address *",
                type: "email",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                email: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        password: {
            element: "input",
            value: "",
            config: {
                name: "password_input",
                type: "password",
                label: "Enter a password *",
                placeholder: ""
            },
            validation: {
                required: true,
                password: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        repeatpassword: {
            element: "input",
            value: "",
            config: {
                name: "repeatpassword_input",
                type: "password",
                label: "Re-enter password *",
                placeholder: ""
            },
            validation: {
                required: true,
                repeatpassword: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        firstname: {
            element: "input",
            value: "",
            config: {
                name: "firstname_input",
                label: "Enter your first name *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                text: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        lastname: {
            element: "input",
            value: "",
            config: {
                name: "lastname_input",
                label: "Enter your last name *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                text: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        dob: {
            element: "date",
            value: "",
            config: {
                name: "date_input",
                label:
                    "Enter your date of birth (used for movie age restrictions) *",
                type: "date",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                date: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        address: {
            element: "input",
            value: "",
            config: {
                name: "address_input",
                label: "Enter your address *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                text: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        },
        phonenumber: {
            element: "input",
            value: "",
            config: {
                name: "phonenumber_input",
                label: "Enter your phone number (8-10 digits) *",
                type: "text",
                placeholder: "",
                showlabel: true
            },
            validation: {
                required: true,
                text: true
            },
            valid: true,
            validationMessage: "",
            showlabel: true
        }
    }
};

const RegistrationPage = props => {
    const [formState, setFormState] = React.useState(INITIAL_FORM_STATE);

    function handleUpdate(element) {
        const newFormdata = { ...formState.formdata };
        const pwElement = { ...newFormdata["password"] };
        const newElement = { ...newFormdata[element.id] };
        newElement.value = element.event.target.value;

        if (element.id == "repeatpassword") {
            var validData = validateRepeatPassword(newElement, pwElement.value);
        } else {
            var validData = validate(newElement);
        }
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        if (
            formState.formdata.email.valid == false ||
            formState.formdata.password.valid == false ||
            formState.formdata.repeatpassword.valid == false ||
            formState.formdata.firstname.valid == false ||
            formState.formdata.lastname.valid == false ||
            formState.formdata.dob.valid == false
        ) {
            setFormState({ formValid: false });
        } else {
            setFormState({ formValid: true });
        }

        newFormdata[element.id] = newElement;

        setFormState({
            formError: false,
            formdata: newFormdata
        });
    }

    function handleSubmit(event) {
        let email = formState.formdata.email.value;
        let password = formState.formdata.password.value;

        let userData = {
            email: email,
            firstname: formState.formdata.firstname.value,
            lastname: formState.formdata.lastname.value,
            dob: formState.formdata.dob.value,
            address: formState.formdata.address.value,
            phonenumber: formState.formdata.phonenumber.value
        };

        createUserWithAuth(email, password)
            .then(authUser => {
                setFormState({ ...INITIAL_FORM_STATE });
                createUserInDatabase(authUser, userData)
                    .then(createdUser => {
                        alert(
                            "Successfully registered user with email " +
                                createdUser.email
                        );
                    })
                    .catch(reason => {
                        alert("DATABASE_ERROR reason: " + reason);
                    });
            })
            .catch(reason => {
                alert("AUTH_ERROR reason: " + reason);
                alert("err code: " + reason.errorCode);
                alert("err msg: " + reason.errorMessage);
            });

        event.preventDefault();
    }

    return (
        <div className={props.classes.background}>
            <main className={props.classes.main}>
                <CssBaseline />
                <Paper className={props.classes.paper}>
                    <Button className={props.classes.button} color="default">
                        <Link to="/home" style={{ textDecoration: "none" }}>
                            <ArrowBackIcon
                                style={{ transform: "translateY(7px)" }}
                            />
                            Return
                        </Link>
                    </Button>

                    <Avatar className={props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration Form
                    </Typography>
                    <form className={props.classes.form}>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.email.valid}
                        >
                            <FormField
                                id={"email"}
                                formdata={formState.formdata.email}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.password.valid}
                        >
                            <FormField
                                id={"password"}
                                formdata={formState.formdata.password}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.repeatpassword.valid}
                        >
                            <FormField
                                id={"repeatpassword"}
                                formdata={formState.formdata.repeatpassword}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.firstname.valid}
                        >
                            <FormField
                                id={"firstname"}
                                formdata={formState.formdata.firstname}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.lastname.valid}
                        >
                            <FormField
                                id={"lastname"}
                                formdata={formState.formdata.lastname}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.dob.valid}
                        >
                            <FormField
                                id={"dob"}
                                formdata={formState.formdata.dob}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.address.valid}
                        >
                            <FormField
                                id={"address"}
                                formdata={formState.formdata.address}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formState.formdata.phonenumber.valid}
                        >
                            <FormField
                                id={"phonenumber"}
                                formdata={formState.formdata.phonenumber}
                                change={element => handleUpdate(element)}
                            />
                        </FormControl>
                        <FormControl margin="normal" justify="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="inherit"
                                size="large"
                                onClick={event => handleSubmit(event)}
                                disabled={formState.formValid}
                            >
                                Register
                            </Button>
                        </FormControl>
                    </form>
                    {/* <div className={this.props.classes.divider} /> */}
                </Paper>
            </main>
        </div>
    );
};

const RegistrationComposed = compose(withFirebase)(RegistrationPage);

export default withStyles(registrationPageLayoutStyles)(RegistrationComposed);
