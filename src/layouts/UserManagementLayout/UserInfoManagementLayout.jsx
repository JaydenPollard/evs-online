import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "firebase";
import CustomerCard from "../../components/UserCard/CustomerCard";
import { userInfoManagementStyles } from "./UserInfoManagementLayoutStyles";
import AppBar from "../../components/AppBar/AppBar";

// Holds the cards
const placeHolder = [];

const rootRef = firebase
    .database()
    .ref()
    .child("Users")
    .child("Customers");
rootRef.once("value").then(function sth(snapshot) {
    snapshot.forEach(function sth1(childSnapShot) {
        placeHolder.push(childSnapShot.key);
    });
});

function UserInfoManagementLayout(props) {
    const { classes } = props;

    // const cardList = placeHolder.map(cardId => (
    //     <Grid container spacing={24}>
    //         <CustomerCard userId={cardId} />
    //     </Grid>
    // ));

    return (
        <div className={classes.background}>
            <AppBar />
            <div className={classes.main}>
                <Grid container spacing={24}>
                    <CustomerCard userId="C1001" />
                </Grid>
                <Grid container spacing={24}>
                    <CustomerCard userId="C1002" />
                </Grid>
                <Grid container spacing={24}>
                    <CustomerCard userId="C1003" />
                </Grid>
                {/* <Grid container spacing={24}>{cardList}</Grid> */}
            </div>
        </div>
    );
}

UserInfoManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(userInfoManagementStyles)(UserInfoManagementLayout);
