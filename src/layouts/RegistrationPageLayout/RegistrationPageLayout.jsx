import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { registrationPageLayoutStyles } from "./RegistrationPageLayoutStyles";

function RegistrationPageLayout(props) {
    const { classes } = props;

    return (
        <div className={classes.background}>
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Button className={classes.button} color="default">
                        <Link to="/home" style={{ textDecoration: "none" }}>
                            <ArrowBackIcon
                                style={{ transform: "translateY(7px)" }}
                            />
                            Return
                        </Link>
                    </Button>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration Form
                    </Typography>
                    <form className={classes.form}>
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
                                type="first-name"
                                id="first-name"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="last-name">
                                Last Name
                            </InputLabel>
                            <Input
                                name="last-name"
                                type="last-name"
                                id="last-name"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="date-of-birth">
                                Date of Birth
                            </InputLabel>
                            <Input name="date-of-birth" type="dob" id="dob" />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="inherit"
                            className={classes.submit}
                        >
                            Register
                        </Button>
                    </form>
                    {/* <div className={classes.divider} /> */}
                    <form className={classes.form}>
                        {/* TODO: Add Google and Facebook Login/Registration Button here */}
                    </form>
                </Paper>
            </main>
        </div>
    );
}

RegistrationPageLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(registrationPageLayoutStyles)(RegistrationPageLayout);
