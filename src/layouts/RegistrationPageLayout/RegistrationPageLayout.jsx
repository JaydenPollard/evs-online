import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";
import { validateRepeatPasswordElement, validateElement } from "./validate";
import createUserWithEmailAndPassword from "./auth";
import { withFirebase } from "../../components/Firebase";
import CredentialsForm from "./CredentialsForm";
import AddressForm from "./AddressForm";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { compose } from "recompose";
import { Link } from "react-router-dom";

const INITIAL_FORM_STATE = {
    formNextValid: false,
    formRegisterValid: false,
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
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
            valid: false,
            validationMessage: "This field is required",
            showlabel: true
        }
    }
};

const RegistrationPage = props => {
    const steps = ["User credentials", "Personal details"];
    const [formState, setFormState] = React.useState(INITIAL_FORM_STATE);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleButtonEnable = () => {
        formState.formNextValid = true;
    };

    const handleUpdate = element => {
        const newFormdata = { ...formState.formdata };
        const pwElement = { ...newFormdata["password"] };
        const newElement = { ...newFormdata[element.id] };
        newElement.value = element.event.target.value;

        if (element.id == "repeatpassword") {
            var validData = validateRepeatPasswordElement(
                newElement,
                pwElement.value
            );
        } else {
            var validData = validateElement(newElement);
        }
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement;

        setFormState({
            formdata: newFormdata
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
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
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <CredentialsForm
                        formState={formState}
                        handleUpdate={handleUpdate}
                        handleButtonEnable={handleButtonEnable}
                    />
                );
            case 1:
                return (
                    <AddressForm
                        formState={formState}
                        handleUpdate={handleUpdate}
                        handleButtonEnable={handleButtonEnable}
                    />
                );
            default:
                throw new Error("Unknown step");
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className={props.classes.background}>
            <main className={props.classes.main}>
                <CssBaseline />
                <Paper className={props.classes.paper}>
                    <Grid container justify="left" alignItems="left">
                        <Button
                            variant="contained"
                            size="small"
                            className={props.classes.returnButton}
                        >
                            <ArrowBackIcon
                                className={clsx(
                                    props.classes.leftIcon,
                                    props.classes.iconSmall
                                )}
                            />
                            <Link
                                to="/home"
                                style={{
                                    textDecorationLine: "none",
                                    color: "black"
                                }}
                            >
                                Return
                            </Link>
                        </Button>
                    </Grid>
                    <Avatar className={props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration Form
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={props.classes.stepper}
                    >
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for registering with EVS!
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your account email is{" "}
                                    {formState.formdata.email}
                                    and you are now logged in. Please click the
                                    button below to return to the home page.
                                </Typography>
                                <Link
                                    to="/home"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        size="large"
                                        className={props.classes.button}
                                    >
                                        Home
                                    </Button>
                                </Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <form className={props.classes.form}>
                                    {getStepContent(activeStep)}
                                    {activeStep !== 0 && (
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                xs="8px"
                                                justify="flex-start"
                                            >
                                                <Button
                                                    className={
                                                        props.classes.button
                                                    }
                                                    variant="contained"
                                                    color="inherit"
                                                    size="large"
                                                    onClick={handleBack}
                                                >
                                                    Back
                                                </Button>
                                            </Grid>
                                            <Grid
                                                item
                                                xs="8px"
                                                justify="flex-end"
                                            >
                                                <Button
                                                    className={
                                                        props.classes.button
                                                    }
                                                    variant="contained"
                                                    color="inherit"
                                                    size="large"
                                                    onClick={
                                                        activeStep ===
                                                        steps.length - 1
                                                            ? event =>
                                                                  handleSubmit(
                                                                      event
                                                                  )
                                                            : handleNext
                                                    }
                                                    disabled={
                                                        activeStep ===
                                                        steps.length - 1
                                                            ? !formState.formRegisterValid
                                                            : !formState.formNextValid
                                                    }
                                                >
                                                    {activeStep ===
                                                    steps.length - 1
                                                        ? "Register"
                                                        : "Next"}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                    {activeStep == 0 && (
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Button
                                                className={props.classes.button}
                                                variant="contained"
                                                color="inherit"
                                                size="large"
                                                onClick={
                                                    activeStep ===
                                                    steps.length - 1
                                                        ? event =>
                                                              handleSubmit(
                                                                  event
                                                              )
                                                        : handleNext
                                                }
                                                disabled={
                                                    activeStep ===
                                                    steps.length - 1
                                                        ? !formState.formRegisterValid
                                                        : !formState.formNextValid
                                                }
                                            >
                                                {activeStep === steps.length - 1
                                                    ? "Register"
                                                    : "Next"}
                                            </Button>
                                        </Grid>
                                    )}
                                </form>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </div>
    );
};

const RegistrationComposed = compose(withFirebase)(RegistrationPage);

export default withStyles(registrationPageLayoutStyles)(RegistrationComposed);
