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

function CustomerForm() {
    const [user, setUser] = useState({
        name: "",
        dob: "",
        email: "",
        memberType: "Standard",
        phoneNum: "",
        address: ""
    });
    const rootRef = firebase
        .database()
        .ref()
        .child("Users")
        .child("Customers");
    // rootRef.once("value").then(function(data) {
    //   console.log(data.key);
    // })
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

    function handleNameChange(event) {
        const newName = event.target.value;
        setUser(data => {
            return { ...data, name: newName };
        });
    }
    function handleDoBChange(event) {
        setUser(data => {
            return { ...data, dob: event.target.value };
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

    function handleSubmit(e) {
        e.preventDefault();
        console.log(user);
    }

    //   function updateFirebse() {
    //     rootRef.child("Address").set(address);
    //     rootRef.child("DoB").set(dob);
    //     rootRef.child("Email").set(email);
    //     rootRef.child("JoinedDate").set(joinedDate);
    //     rootRef.child("MemberType").set(memberType);
    //     rootRef.child("Name").set(name);
    //     rootRef.child("PhoneNum").set(phoneNum);
    // }

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <ValidatorForm autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography>User Basic Info</Typography>
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
                                    helperText="This will be used as your login credentials"
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
                            <Grid item xs={24} sm={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="inherit"
                                    fullWidth
                                >
                                    Create New User
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
