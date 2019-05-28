import React, { useState } from "react";
import "firebase/database";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import InfoSnackbar from "../../components/common/InfoSnackbar";
import updateOrderStatus from "../../logic/order/updateOrderStatus.function";

const OrderItem = props => {
    const { currentUser, orderId, order, movieName, customerName } = props;
    const [orderCancelSuccess, setOrderCancelSuccess] = useState(false);
    const [isStaff, setIsStaff] = useState(true);

    async function handleCancel(e) {
        e.preventDefault();
        const cancelSuccess = await updateOrderStatus(orderId, "Cancelled");
        if (cancelSuccess) {
            setOrderCancelSuccess(true);
        }
    }

    if (order.OrderStatus === "Cancelled") {
        return null;
    }

    if (order.CustomerID !== currentUser && !isStaff) {
        return null;
    } else {
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
                            <Grid item justify="flex-end">
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
                    <InfoSnackbar
                        open={orderCancelSuccess}
                        onClose={() => {
                            setOrderCancelSuccess(false);
                        }}
                        message="Order cancelled. It will not appear in future searches."
                    />
                </Paper>
            </Grid>
        );
    }
};

export default OrderItem;
