/* eslint-disable func-names */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "firebase";
import CustomerCard from "../../components/UserCard/CustomerCard";
import { userInfoManagementStyles } from "./UserInfoManagementLayoutStyles";
import AppBar from "../../components/AppBar/AppBar";

function UserInfoManagementLayout(props) {
    const { classes } = props;
    const [userKey, setUserKey] = useState([]);
    const placeHolder = [];
    const rootRef = firebase
        .database()
        .ref()
        .child("Users")
        .child("Customers");

    useEffect(() => {
        rootRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                placeHolder.push(childSnapshot.key);
            });
            setUserKey(placeHolder);
        });
    });

    return (
        <div className={classes.background}>
            <AppBar />
            <div className={classes.main}>
                {userKey.map(userId => (
                    <Grid container spacing={24}>
                        <CustomerCard userId={userId} />
                    </Grid>
                ))}
            </div>
        </div>
    );
}

UserInfoManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(userInfoManagementStyles)(UserInfoManagementLayout);
