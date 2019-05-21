/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
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

const rootRef = firebase
    .database()
    .ref()
    .child("Users")
    .child("Customers")
    // This will be replaced with data passed from UserInfoLayout
    .child("C1003");

const addressRef = rootRef.child("Address");
let addressVal = "";
const dob = rootRef.child("Dob");
const email = rootRef.child("Email");
const joinedDate = rootRef.child("JoinedDate");
const memberType = rootRef.child("MemberType");
const name = rootRef.child("Name");
const phoneNum = rootRef.child("PhoneNum");
const id = rootRef.child("C1003");
// Access data stored in addressRef using a snapshot. Could be repeated for other ref but I'm having problems trying to pass this value into Typography
addressRef.once("value").then(function(snapshot) {
    // console.log(snapshot.val());
    addressVal = snapshot.val();
    console.log(addressVal);
});

const UserCard = () => {
    const [name, setName] = useState(0);
    const [dob, setDob] = useState(0);
    const [email, setEmail] = useState(0);
    const [joinedDate, setJoinedDate] = useState(0);
    const [memberType, setMemberType] = useState(0);
    const [phoneNum, setPhoneNum] = useState(0);
    const [address, setAddress] = useState(0);

    useEffect(() => {
        // At this point addressVal is blank and log  returns nothing
        console.log(addressVal);
        setAddress(addressVal);
    });

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography>User Basic Info</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Name: {name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>DoB: {dob}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Email: {email}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Joined Date: {joinedDate}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Memeber Type: {memberType}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography>Phone Number: {phoneNum}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Address: {address}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                ID: Some ID passed when usercard is used
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button>Edit</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default withStyles()(UserCard);
