/* eslint-disable func-names */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import * as firebase from "firebase/app";
import CustomerCard from "../UserCard/CustomerCard";

function CustomerGrid() {
    const [userKey, setUserKey] = useState([]);
    const placeHolder = [];
    const rootRef = firebase.database
        .ref()
        .child("Users")
        .child("Customers");

    // Push all userID from our list of users in firebase to a placeholder, then set userKey array to that value
    useEffect(() => {
        rootRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                placeHolder.push(childSnapshot.key);
            });
            setUserKey(placeHolder);
        });
    });

    return (
        <Grid container spacing={24}>
            {/* For each user ID, render a user card with that ID passed into its props */}
            {userKey.map(userId => (
                <Grid item key={userId}>
                    <CustomerCard userId={userId} />
                </Grid>
            ))}
        </Grid>
    );
}

export default CustomerGrid;
