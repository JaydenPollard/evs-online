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
                <Typography>User Basic Info</Typography>
                <Typography>Name:</Typography>
                <Typography>User Type:</Typography>
                <Typography>Email:</Typography>
                <Typography>Phone Number:</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
};

export default UserCard;
