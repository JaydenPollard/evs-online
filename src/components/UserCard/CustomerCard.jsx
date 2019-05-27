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
// import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import NumberFormat from "react-number-format";
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

function CustomerCard(props) {
    // const CustomerCard = props => {
    const user = props;
    const rootRef = firebase
        .database()
        .ref()
        .child("Users")
        .child("Customers")
        .child(user.userId);
    const [name, setName] = useState("");
    const [dob, setDoB] = useState("");
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
        setDoB(e.target.value);
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
        setPhoneNum(e.target.value);
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
        rootRef.once("value").then(snapshot => {
            snapshot.forEach(attributes => {
                switch (attributes.key) {
                    case "Address":
                        setAddress(attributes.val());
                        break;
                    case "DoB":
                        setDoB(attributes.val());
                        break;
                    case "Email":
                        setEmail(attributes.val());
                        break;
                    case "JoinedDate":
                        setJoinedDate(attributes.val());
                        break;
                    case "MemberType":
                        setMemberType(attributes.val());
                        break;
                    case "Name":
                        setName(attributes.val());
                        break;
                    case "PhoneNum":
                        setPhoneNum(attributes.val());
                        break;
                    default:
                }
            });
        });
        // Stops rootRef from being passed into watchlist, which stops user from editing cards
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                <Typography>ID:</Typography>
                                <Input
                                    placeholder="Name"
                                    value={user.userId}
                                    disabled
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
                                <NumberFormat
                                    customInput={TextField}
                                    format="+64 ### ### ###"
                                    placeholder="Phone Number"
                                    value={phoneNum}
                                    onChange={handlePhoneNumChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Address:</Typography>
                                <Input
                                    placeholder="Address"
                                    value={address}
                                    onChange={handleAddressChange}
                                    required
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
}

export default CustomerCard;
