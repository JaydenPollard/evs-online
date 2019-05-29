import React, { useState } from "react";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import {
    Typography,
    Paper,
    Avatar,
    Button,
    FormControl,
    Input,
    InputLabel,
    Link
} from "@material-ui/core";
import moment from "moment";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Image from "../../assests/popcorn-login-background.jpg";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as firebase from "firebase/app";
import { loginPageLayoutStyles } from "./LoginPageLayoutStyles";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "firebase/auth";

function LoginPage(props) {
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const handleEmail = e => {
        setEmail(e.target.value);
    };
    function login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push("/home");
                const dbref = firebase.database().ref("AccessLog/");
                const newDbRef = dbref.push();
                newDbRef.set({
                    date: moment(Date()).format("DD/MM/YYYY"),
                    time: moment(Date()).format("hh:mm A"),
                    userID: firebase.auth().currentUser.uid
                });
                setErr("Successful");
            })
            .catch(error => {
                setErr(error.message);
            });
    }

    return (
        <div className={classes.background}>
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} />
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    {/* <form
                        className={classes.form}
                        onSubmit={e => e.preventDefault() && false}
                    > */}
                    <ValidatorForm>
                        <FormControl margin="normal" required fullWidth>
                            <Typography> Enter your email </Typography>
                            <TextValidator
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmail}
                                validators={["isEmail"]}
                                errorMessages={["Invalid Email"]}
                                required
                                />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={login}
                            className={classes.submit}
                        >
                            {" "}
                            Login
                        </Button>

                        <div> {err} </div>
                    </ValidatorForm>
                    {/* </form> */}
                </Paper>
            </main>
        </div>
    );
}
LoginPage.propTypes ={
    history: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired

}
export default withStyles(loginPageLayoutStyles)(LoginPage);
