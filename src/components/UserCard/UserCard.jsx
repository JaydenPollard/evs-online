import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const UserCard = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography>User Basic Info</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Name: Sam Smith</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>DoB: 11/9/2000</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Joined Date:14/5/2019</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Memeber Type:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Phone Number:</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
};

export default withStyles()(UserCard);
