import React, { useState } from "react";
import {
    FormControl,
    Grid,
    Input,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as firebase from "firebase/app";
import "firebase/database";
import NumberFormat from "react-number-format";
import PasswordValidator from "password-validator";
import { customer } from "../../models/user";
import { createNewCustomer } from "../../logic/user/addUser.function";

function CustomerForm() {
    // Sets some common validation rules for password
    const schema = new PasswordValidator();
    schema
        .is()
        .min(7)
        .is()
        .max(100)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits()
        .has()
        .not()
        .spaces()
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]);

    // Use an empty customer model as a template for creating new customers
    const [user, setUser] = useState(customer);
    const [error, setError] = useState(false);
    const rootRef = firebase.database
        .ref()
        .child("Users")
        .child("Customers");
    const memberInput = [
        {
            value: "Standard",
            label: "Standard"
        },
        {
            value: "VIP",
            label: "VIP"
        }
    ];

    // Handle appropriate onChange events for each fields in the form
    const handleNameChange = event => {
        const newName = event.target.value;
        setUser(data => {
            return { ...data, name: newName };
        });
    };
    const handleDoBChange = event => {
        const newDob = event.target.value;
        setUser(data => {
            return { ...data, dob: newDob };
        });
    };
    const handleEmailChange = event => {
        const newEmail = event.target.value;
        setUser(data => {
            return { ...data, email: newEmail };
        });
    };
    const handleMemberTypeChange = event => {
        setUser(data => {
            return { ...data, memberType: event.target.value };
        });
    };
    const handlePhoneNumChange = event => {
        const newPhoneNum = event.target.value;
        setUser(data => {
            return { ...data, phoneNum: newPhoneNum };
        });
    };
    const handleAddressChange = event => {
        const newAddress = event.target.value;
        setUser(data => {
            return { ...data, address: newAddress };
        });
    };
    const handlePasswordChange = event => {
        passwordValidation();
        const newPassword = event.target.value;
        setUser(data => {
            return { ...data, password: newPassword };
        });
    };
    // Handles password validation for the form, if password doesn't conform to schema or both fields don't match, display an error
    const passwordValidation = () => {
        if (schema.validate(user.password)) {
            setError(false);
        } else {
            setError(true);
        }
    };
    const passwordConfirm = event => {
        const newValidPassword = event.target.value;
        if (newValidPassword !== user.password) {
            setError(true);
        } else {
            setError(false);
        }
        setUser(data => {
            return { ...data, validPassword: newValidPassword };
        });
    };
    const handleSubmit = event => {
        event.preventDefault();
        createNewCustomer(rootRef, user);
        setUser(customer);
    };
    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <ValidatorForm autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography>Customer Basic Info</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Name:</Typography>
                                <Input
                                    placeholder="Name"
                                    value={user.name}
                                    onChange={handleNameChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>DoB:</Typography>
                                <FormControl>
                                    <TextField
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={user.dob}
                                        onChange={handleDoBChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Email:</Typography>
                                <TextValidator
                                    name="email"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={handleEmailChange}
                                    validators={["isEmail"]}
                                    errorMessages={["Email is not valid"]}
                                    required
                                    helperText="This will be used as customer login credentials"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Member Type:</Typography>
                                <FormControl>
                                    <TextField
                                        select
                                        value={user.memberType}
                                        onChange={handleMemberTypeChange}
                                    >
                                        {memberInput.map(option => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Phone Number:</Typography>
                                <NumberFormat
                                    customInput={TextField}
                                    value={user.phoneNum}
                                    onChange={handlePhoneNumChange}
                                    format="+614## ### ###"
                                    placeholder="Phone Number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Address:</Typography>
                                <Input
                                    placeholder="Address"
                                    value={user.address}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Password:</Typography>
                                <TextValidator
                                    type="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={handlePasswordChange}
                                    error={error}
                                    helperText="At least 8 characters, uppercase, lowercase, digits"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Validate Password:</Typography>
                                <TextValidator
                                    type="password"
                                    placeholder="Validate Password"
                                    value={user.validPassword}
                                    onChange={passwordConfirm}
                                    errorMessages={[
                                        "Password must be the same"
                                    ]}
                                    helperText="Confirm password"
                                    error={error}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="inherit"
                                    fullWidth
                                >
                                    Create New Customer
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </CardContent>
            </Card>
        </Grid>
    );
}
export default CustomerForm;
