/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable func-names */
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
    Typography,
    Grid,
    Input,
    FormControl,
    TextField,
    MenuItem
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCTT8GvpjD5AMOMkAQZlP8Pj8P57n70jJg",
    authDomain: "tba-evs.firebaseapp.com",
    databaseURL: "https://tba-evs.firebaseio.com",
    projectId: "tba-evs",
    storageBucket: "tba-evs.appspot.com",
    messagingSenderId: "747412141354",
    appId: "1:747412141354:web:59d4cf6f365fc635"
};
firebase.initializeApp(firebaseConfig);

const UserCard = props => {
    // function UserCard(props) {

    const rootRef = firebase
        .database()
        .ref()
        .child("Users")
        .child("Customers")
        .child(props.userId);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [memberType, setMemberType] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
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

    const handleNameChange = e => {
        setName(e.target.value);
    };
    const handleAddressChange = e => {
        setAddress(e.target.value);
    };
    const handleDoBChange = e => {
        setDob(e.target.value);
    };
    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const handleJoinedDateChange = e => {
        setJoinedDate(e.target.value);
    };
    const handleMemberTypeChange = e => {
        setMemberType(e.target.value);
    };
    const handlePhoneNumChange = e => {
        // Creates a pattern that matches ONLY NUMBER or EMPTY STRING and check if the target.value has the pattern or not
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhoneNum(e.target.value);
        }
    };
    const handleSubmit = e => {
        // Stops the page from refreshing
        e.preventDefault();
        updateFirebse();
    };

    function updateFirebse() {
        rootRef.child("Address").set(address);
        rootRef.child("DoB").set(dob);
        rootRef.child("Email").set(email);
        rootRef.child("JoinedDate").set(joinedDate);
        rootRef.child("MemberType").set(memberType);
        rootRef.child("Name").set(name);
        rootRef.child("PhoneNum").set(phoneNum);
    }

    useEffect(() => {
        rootRef.child("Address").on(
            "value",
            function(snapshot) {
                setAddress(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        rootRef.child("DoB").on(
            "value",
            function(snapshot) {
                setDob(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        rootRef.child("Email").on(
            "value",
            function(snapshot) {
                setEmail(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        rootRef.child("JoinedDate").on(
            "value",
            function(snapshot) {
                setJoinedDate(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        rootRef.child("MemberType").on(
            "value",
            function(snapshot) {
                setMemberType(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        rootRef.child("Name").on(
            "value",
            function(snapshot) {
                setName(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        rootRef.child("PhoneNum").on(
            "value",
            function(snapshot) {
                setPhoneNum(snapshot.val());
            },
            function(error) {
                console.log(error.code);
            }
        );
        // TODO: Investigate why rootRef is causing problem when passed into 2nd arg
    }, [props.userId]);

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
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>DoB:</Typography>
                                <FormControl>
                                    <TextField
                                        type="date"
                                        value={dob}
                                        onChange={handleDoBChange}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Email:</Typography>
                                <TextValidator
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    validators={["isEmail"]}
                                    errorMessages={["Email is not valid"]}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Joined Date:</Typography>
                                <FormControl>
                                    <TextField
                                        type="date"
                                        value={joinedDate}
                                        onChange={handleJoinedDateChange}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Memeber Type:</Typography>
                                <FormControl>
                                    <TextField
                                        select
                                        value={memberType}
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
                                <Input
                                    placeholder="Phone Number"
                                    value={phoneNum}
                                    onChange={handlePhoneNumChange}
                                    required
                                    startAdornment={
                                        <InputAdornment position="start">
                                            +64
                                        </InputAdornment>
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Address:</Typography>
                                <Input
                                    placeholder="Address"
                                    value={address}
                                    onChange={handleAddressChange}
                                    required
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="inherit"
                                >
                                    Submit Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserCard;
