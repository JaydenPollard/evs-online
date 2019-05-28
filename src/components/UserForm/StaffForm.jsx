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
import firebase from "firebase";
import NumberFormat from "react-number-format";
import PasswordValidator from "password-validator";
function StaffForm() {
    var schema  = new PasswordValidator();  
    schema
    .is().min(7)
    .is().max(100)                                  
    .has().uppercase()                              
    .has().lowercase()                              
    .has().digits()                                 
    .has().not().spaces()                          
    .is().not().oneOf(['Passw0rd', 'Password123']); 

    const [user, setUser] = useState({
        name: "",
        dob: "",
        email: "",
        accessLevel: "Staff",
        phoneNum: "",
        address: "",
        password: "",
        validPassword:"",
        joinedDate: ""
    });
    const [error, setError] = useState(false);
    const rootRef = firebase
        .database()
        .ref()
        .child("Users")
        .child("Staffs");
    const accessLevel = [
        {
            value: "Admin",
            label: "Admin"
        },
        {
            value: "Staff",
            label: "Staff"
        }
    ];

    function handleNameChange(event) {
        const newName = event.target.value;
        setUser(data => {
            return { ...data, name: newName };
        });
    }
    function handleDoBChange(event) {
        setUser(data => {
            return { ...data, dob: event.target.value};
        });
    }
    function handleEmailChange(event) {
        const newEmail = event.target.value;
        setUser(data => {
            return { ...data, email: newEmail };
        });
    }
    function handleMemberTypeChange(event) {
        setUser(data => {
            return { ...data, memberType: event.target.value };
        });
    }
    function handlePhoneNumChange(event) {
        const newPhoneNum = event.target.value;
        setUser(data => {
            return { ...data, phoneNum: newPhoneNum };
        });
    }
    function handleAddressChange(event) {
        const newAddress = event.target.value;
        setUser(data => {
            return { ...data, address: newAddress };
        });
    }
    function handlePasswordChange(event) {
        passwordValidation();
        const newPassword = event.target.value;
        setUser(data => {
            return { ...data, password: newPassword };
        });
    }
    function passwordValidation(){
        if (schema.validate(user.password)){
            setError(false);
        }
        else 
        {
            setError(true);
        }
    }
    function passwordConfirm(event) {
        const newValidPassword = event.target.value;
        if (newValidPassword !== user.password)
        {
            setError(true);
        }
        else
        {
        setError(false);
        }      
        setUser(data => {
            return { ...data, validPassword: newValidPassword };
        });
     
    }
    function handleSubmit(e) {
        e.preventDefault();
        updateFirebse();
    }

    function setJoinedDate() {
        var placeHolderDate = new Date();
        var formattedDate =
            placeHolderDate.getFullYear() +
            "-" +
            ('0' + (placeHolderDate.getMonth()+1)).slice(-2) +
            "-" +
            ('0' + (placeHolderDate.getDate()+1)).slice(-2)
        return formattedDate;
    }

    function updateFirebse() {
        rootRef.push().set({
            Name: user.name,
            Address: user.address,
            AccessLevel: user.accessLevel,
            DoB: user.dob,
            Email: user.email,
            JoinedDate: setJoinedDate(),
            Password: user.password,
            PhoneNum: user.phoneNum
        });
    }
    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <ValidatorForm autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography>Staff Basic Info</Typography>
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
                                    helperText="This will be used as staff login credentials"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Access Level:</Typography>
                                <FormControl>
                                    <TextField
                                        select
                                        value={user.accessLevel}
                                        onChange={handleMemberTypeChange}
                                    >
                                        {accessLevel.map(option => (
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
                                    format="+64 ### ### ###"
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
                                    errorMessages={["Password must be the same"]}
                                    helperText="Confirm password"
                                    error={error}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button disabled = {error}
                                    type="submit"
                                    variant="contained"
                                    color="inherit"
                                    fullWidth

                                >
                                    Create New Staff
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </CardContent>
            </Card>
        </Grid>
    );
}
export default StaffForm;
