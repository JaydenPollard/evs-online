import React, { useState, useEffect } from "react";
import "firebase/database";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, Button, TextField } from "@material-ui/core";
import InfoSnackbar from "../../common/InfoSnackbar";
import updateOrderStatus from "../../../logic/order/updateOrderStatus.function";
import updatePaidStatus from "../../../logic/order/updateOrderPaid.function";

/**
 * Renders an order item that the user can see
 * @param props The props being passed into the component
 * @returns a view
 */
const OrderItem = props => {
    const { isStaff, currentUser, orderId, order, movie } = props;
    const [movieName, setMovieName] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [orderCancelSuccess, setOrderCancelSuccess] = useState(false);
    const [orderPaidSuccess, setOrderPaidSuccess] = useState(false);
    const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);
    const [orderStatus, setOrderStatus] = useState(order.OrderStatus);

    //Function for handling cancel button click
    async function handleCancel(e) {
        e.preventDefault();
        const cancelSuccess = await updateOrderStatus(orderId, "Cancelled");
        if (cancelSuccess) {
            setOrderCancelSuccess(true);
        }
    }

    //Function for handling paid button click
    async function handlePaid(e) {
        e.preventDefault();
        const paidSuccess = await updatePaidStatus(orderId);
        if (paidSuccess) {
            setOrderPaidSuccess(true);
        }
    }

    //Function for handling update status button click
    async function handleStatusUpdate(e) {
        e.preventDefault();
        const statusUpdateSuccess = await updateOrderStatus(
            orderId,
            orderStatus
        );
        if (statusUpdateSuccess) {
            setStatusUpdateSuccess(true);
        }
    }

    //Function that only runs when movie or currentUser props update
    useEffect(() => {
        movie.then(function(snapshot) {
            setMovieName(snapshot.movieName);
        });

        //Checks if currentUser exists or not, otherwise set user to anon
        currentUser.then(function(snapshot) {
            if (snapshot) {
                setCurrentUserId(snapshot.uid);
            } else {
                setCurrentUserId("anon");
            }
        });
    }, [movie, currentUser]);

    //Logic to check if order should be rendered, dont render if cancelled or order isnt for that user
    if (order.OrderStatus === "Cancelled") {
        return null;
    } else if (order.CustomerID !== currentUserId && !isStaff) {
        return null;
    } else {
        return (
            <Grid item>
                <Paper style={{ width: "40vw", padding: "15px" }}>
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
                        <Grid container spacing={8}>
                            {/* Render button different if paid or not at all if staff*/}
                            {!isStaff ? (
                                order.OrderPaid ? (
                                    <Grid item>
                                        <Button variant="outlined" disabled>
                                            Order Paid
                                        </Button>
                                    </Grid>
                                ) : (
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            onClick={handlePaid}
                                        >
                                            Pay Now
                                        </Button>
                                    </Grid>
                                )
                            ) : (
                                ""
                            )}
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleCancel}
                                >
                                    Cancel Order
                                </Button>
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
                                    Movie Title: {movieName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    Ordered by: {order.CustomerID}
                                </Typography>
                            </Grid>
                            {/* Render status as editable if staff, with button to update*/}
                            {isStaff ? (
                                <Grid container direction="column" spacing={8}>
                                    <Grid item>
                                        <TextField
                                            id="OrderStatus"
                                            name="OrderStatus"
                                            label="Order Status"
                                            value={orderStatus}
                                            onChange={event => {
                                                setOrderStatus(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            onClick={handleStatusUpdate}
                                        >
                                            Update Status
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid item>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Order Status: {order.OrderStatus}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <InfoSnackbar
                        open={orderCancelSuccess}
                        onClose={() => {
                            setOrderCancelSuccess(false);
                        }}
                        message="Order cancelled. It will not appear in future searches."
                    />
                    <InfoSnackbar
                        open={orderPaidSuccess}
                        onClose={() => {
                            setOrderPaidSuccess(false);
                        }}
                        message="Order has been paid for. You will recieve future updates in your mail."
                    />
                    <InfoSnackbar
                        open={statusUpdateSuccess}
                        onClose={() => {
                            setStatusUpdateSuccess(false);
                        }}
                        message="Order status has been updated!"
                    />
                </Paper>
            </Grid>
        );
    }
};

OrderItem.propTypes = {
    isStaff: PropTypes.bool.isRequired,
    orderId: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired
};

export default OrderItem;
