import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Grid, Paper, Typography } from "@material-ui/core";

const OrderItem = props => {
    const { orderId, order, movieName, customerName } = props;

    return (
        <Grid item>
            <Paper style={{ width: "30vw", padding: "15px" }}>
                <Grid container spacing={8}>
                    <Grid container alignItems="baseline" spacing={8}>
                        <Grid item>
                            <Typography gutterBottom variant="h5">
                                {orderId}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="caption">
                                {new Date(order.OrderDate).toDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        alignItems="baseline"
                        spacing={8}
                    >
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1">
                                Movie Title: {order.MovieID}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1">
                                Ordered by: {order.CustomerID}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1">
                                Order Status: {order.OrderStatus}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default OrderItem;
