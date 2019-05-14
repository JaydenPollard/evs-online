import React from "react";
import Grid from "@material-ui/core/Grid";
import UserCard from "../../components/UserCard/UserCard";

const UserInfoManagementLayout = () => {
    return (
        <Grid container spacing={24}>
            <Grid item xs={6}>
                <UserCard />
            </Grid>
            <Grid item xs={6}>
                <UserCard />
            </Grid>
            <Grid item xs={6}>
                <UserCard />
            </Grid>
            <Grid item xs={6}>
                <UserCard />
            </Grid>
            <Grid item xs={6}>
                <UserCard />
            </Grid>
        </Grid>
    );
};

export default UserInfoManagementLayout;
