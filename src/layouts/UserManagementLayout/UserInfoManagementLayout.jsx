import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import UserCard from "../../components/UserCard/UserCard";
import { userInfoManagementStyles } from "./UserInfoManagementLayoutStyles";
import AppBar from "../../components/AppBar/AppBar";

function UserInfoManagementLayout(props) {
    const { classes } = props;
    return (
        <div className={classes.background}>
            <AppBar />
            <div className={classes.main}>
                <Grid container spacing={24}>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                </Grid>
            </div>
        </div>
    );
}

UserInfoManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(userInfoManagementStyles)(UserInfoManagementLayout);
