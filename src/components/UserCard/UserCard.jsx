/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

class UserCard extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Alan Cockburn",
            dob: "30/3/1990",
            email: "alan.mycockburns@hotmail.com",
            joinedDate: "12/5/2019",
            memberType: "Member",
            phoneNum: "123456789",
            address: "Quahog USA"
        };
    }

    componentDidMount() {
        this.setState({});
    }

    render() {
        return (
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography>User Basic Info</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Name: {this.state.name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>DoB: {this.state.dob}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>
                                    Email: {this.state.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>
                                    Joined Date: {this.state.joinedDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>
                                    Memeber Type: {this.state.memberType}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>
                                    Phone Number: {this.state.phoneNum}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Address: {this.state.address}
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
    }
}

export default withStyles()(UserCard);
