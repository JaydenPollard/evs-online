import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import UserCard from "../../components/UserCard/UserCard";
import { userInfoManagementStyles } from "./UserInfoManagementLayoutStyles";
import AppBar from "../../components/AppBar/AppBar";

function UserInfoManagementLayout(props) {
    const { classes } = props;
    const userId = "C1001";
    return (
        <div className={classes.background}>
            <AppBar />
            <div className={classes.main}>
                <Grid container spacing={24}>
                    {/* for each userid found in database ref, create a new user acrd and pass the id as arguements */}
                    <UserCard dataId={userId} />
                </Grid>
            </div>
        </div>
    );
}

UserInfoManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(userInfoManagementStyles)(UserInfoManagementLayout);
