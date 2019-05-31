import {
    createUserWithAuth,
    createUserInDatabase
} from "../../logic/register/authUser.function";
import {
    validateRepeatPasswordElement,
    validateElement
} from "../../logic/register/validateForm.function";
import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";
import CredentialsForm from "../../components/Registration/CredentialsForm";
import PersonalDetailsForm from "../../components/Registration/PersonalDetailsForm";
import { customer } from "../../models/user";
import { initialFormState } from "../../models/registration-form";
import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import PropTypes from "prop-types";
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
import { Link } from "react-router-dom";

const RegistrationPage = props => {
    const steps = ["User credentials", "Personal details"];
    const { classes } = props;
    const [user, setUser] = React.useState(customer);
    const [formState, setFormState] = React.useState(initialFormState);
    const [activeStep, setActiveStep] = React.useState(0);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    // Handle snackbar closing
    function handleSnackbarClosing() {
        setOpenSnackbar(false);
        setSnackbarMessage("");
    }

    // Handle form input updates
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

    // Handle form submission event
    const handleSubmit = event => {
        event.preventDefault();
        let userEmail = formState.formdata.email.value;
        let userPassword = formState.formdata.password.value;
        let userName =
            formState.formdata.firstname.value +
            " " +
            formState.formdata.lastname.value;
        let userDob = formState.formdata.dob.value;
        let userAddress = formState.formdata.address.value;
        let userPhoneNum = formState.formdata.phonenumber.value;

        // Sets a customer object in state
        setUser(data => {
            return {
                ...data,
                name: userName,
                dob: userDob,
                email: userEmail,
                phoneNum: userPhoneNum,
                address: userAddress,
                password: userPassword
            };
        });

        // Invoke Firebase functions for user creation
        createUserWithAuth(userEmail, userPassword)
            .then(authUser => {
                createUserInDatabase(authUser.user.uid, user)
                    .then(createdUser => {
                        setFormState({ ...initialFormState });
                        setActiveStep(activeStep + 1);
                    })
                    .catch(reason => {
                        // Handle database error, display snackbar message
                        setOpenSnackbar(true);
                        setSnackbarMessage(reason);
                    });
            })
            .catch(reason => {
                // Handle auth error, display snackbar message
                setOpenSnackbar(true);
                setSnackbarMessage(reason.errorMessage);
            });
    };

    // Checks which page to display as user steps through Registration Page
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <CredentialsForm
                        formState={formState}
                        handleUpdate={handleUpdate}
                    />
                );
            case 1:
                return (
                    <PersonalDetailsForm
                        formState={formState}
                        handleUpdate={handleUpdate}
                    />
                );
            default:
                // Handle stepper error, display snackbar message
                setOpenSnackbar(true);
                setSnackbarMessage("An error occurred whilst loading the form");
                setActiveStep(0);
        }
    }

    // Handles going to next Registration Page form piece
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    // Handles going back to Registration Page form piece
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className={classes.background}>
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Grid container justify="left" alignItems="left">
                        <Button
                            variant="contained"
                            size="small"
                            className={classes.returnButton}
                        >
                            <ArrowBackIcon
                                className={clsx(
                                    classes.leftIcon,
                                    classes.iconSmall
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
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration Form
                    </Typography>
                    {/* Stepper for the form labels and tracking in Registration Page*/}
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {/* Conditional fragment for the registration success message*/}
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for registering with EVS!
                                </Typography>
                                <Typography variant="subtitle1">
                                    You are now logged in. Please click the
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
                                        className={classes.button}
                                    >
                                        Home
                                    </Button>
                                </Link>
                            </React.Fragment>
                        ) : (
                            /* Conditional fragment for the current Registration form piece and buttons*/
                            <React.Fragment>
                                <form className={classes.form}>
                                    {/*Gets the current Registration form piece*/}
                                    {getStepContent(activeStep)}
                                    {activeStep !== 0 && (
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="inherit"
                                                size="large"
                                                onClick={handleBack}
                                            >
                                                Back
                                            </Button>
                                            {/*Conditional Register/Next button for form navigation*/}
                                            <Button
                                                className={classes.button}
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
                                            >
                                                {activeStep === steps.length - 1
                                                    ? "Register"
                                                    : "Next"}
                                            </Button>
                                        </Grid>
                                    )}
                                    {/*Conditional Register/Next button for form navigation*/}
                                    {activeStep == 0 && (
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="inherit"
                                                size="large"
                                                onClick={handleNext}
                                            >
                                                Next
                                            </Button>
                                        </Grid>
                                    )}
                                </form>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                    {/*Snackbar for displaying form input errors from Firebase*/}
                    <ErrorSnackbar
                        open={openSnackbar}
                        onClose={handleSnackbarClosing}
                        message={snackbarMessage}
                    />
                </Paper>
            </main>
        </div>
    );
};

// Declare proptypes
RegistrationPage.propTypes = {
    formState: PropTypes.object
};

export default withStyles(registrationPageLayoutStyles)(RegistrationPage);
