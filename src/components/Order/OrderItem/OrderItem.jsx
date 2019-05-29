import React, { useState, useEffect } from "react";
import "firebase/database";
import { Grid, Paper, Typography, Button, TextField } from "@material-ui/core";
import InfoSnackbar from "../../common/InfoSnackbar";
import updateOrderStatus from "../../../logic/order/updateOrderStatus.function";
import updatePaidStatus from "../../../logic/order/updateOrderPaid.function";

const OrderItem = props => {
    const { currentUser, orderId, order, movie, customerName } = props;
    const [movieName, setMovieName] = useState("");
    const [orderCancelSuccess, setOrderCancelSuccess] = useState(false);
    const [orderPaidSuccess, setOrderPaidSuccess] = useState(false);
    const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);
    const [orderStatus, setOrderStatus] = useState(order.OrderStatus);
    const [isStaff, setIsStaff] = useState(true);

    async function handleCancel(e) {
        e.preventDefault();
        const cancelSuccess = await updateOrderStatus(orderId, "Cancelled");
        if (cancelSuccess) {
            setOrderCancelSuccess(true);
        }
    }

    async function handlePaid(e) {
        e.preventDefault();
        const paidSuccess = await updatePaidStatus(orderId);
        if (paidSuccess) {
            setOrderPaidSuccess(true);
        }
    }

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

    useEffect(() => {
        movie.then(function(snapshot) {
            setMovieName(snapshot.movieName);
        });
    }, [movie]);

    if (order.OrderStatus === "Cancelled") {
        return null;
    }

    if (order.CustomerID !== currentUser && !isStaff) {
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

export default OrderItem;
