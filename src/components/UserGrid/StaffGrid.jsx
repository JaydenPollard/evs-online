/* eslint-disable func-names */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import * as firebase from "firebase/app";
import StaffCard from "../UserCard/StaffCard";

function StaffGrid() {
    const [userKey, setUserKey] = useState([1, 2, 3]);
    const placeHolder = [];
    const rootRef = firebase.database
        .ref()
        .child("Users")
        .child("Staffs");

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
            {userKey.map(userId => (
                <Grid item key={userId}>
                    <StaffCard userId={userId} />
                </Grid>
            ))}
        </Grid>
    );
}

export default StaffGrid;
