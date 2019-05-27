import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Divider,
    Card
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import order from "../../models/order";
import createOrder from "../../logic/order/createOrder.function";

const NewOrder = props => {
    const [newOrder, setNewOrder] = useState(order);
    const [addOrderSuccess, setAddOrderSuccess] = useState(false);

    const movie = props.location.state;

    function handleDelivery() {
        setNewOrder(orderData => {
            return { ...orderData, OrderDeliver: true };
        });
    }

    function handlePickup() {
        setNewOrder(orderData => {
            return { ...orderData, OrderDeliver: false };
        });
    }

    function handlePayNow() {
        setNewOrder(orderData => {
            return { ...orderData, OrderPaid: true };
        });
    }

    function handlePayLater() {
        setNewOrder(orderData => {
            return { ...orderData, OrderPaid: false };
        });
    }

    async function handlePurchase() {
        const status = newOrder.OrderPaid ? "Order Pending" : "Pending Payment";
        const changeOrder = newOrder;

        changeOrder.CustomerID = "anon";
        changeOrder.MovieID = movie.movieId;
        changeOrder.OrderStatus = status;
        changeOrder.OrderPrice = movie.moviePrice;

        const success = await createOrder(changeOrder);
        if (success) {
            setAddOrderSuccess(true);
        }
    }

    if (addOrderSuccess) {
        return <Redirect to="/" />;
    } else if (!movie) {
        return (
            <React.Fragment>
                <AppBar />
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <Typography variant="h5">
                        MovieID not found. Please try again.
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <AppBar />
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <Typography variant="h3">Checkout</Typography>
                    <Grid item>
                        <Paper style={{ width: "50vw", padding: "15px" }}>
                            <Grid
                                container
                                direction="column"
                                alignItems="baseline"
                                spacing={10}
                                style={{ padding: "15px" }}
                            >
                                <Typography variant="h5">
                                    Payment and Delivery
                                </Typography>
                                <Grid item>
                                    <Typography gutterBottom variant="h6">
                                        Shipping Method
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row  "
                                        spacing={8}
                                    >
                                        <Grid item>
                                            <Card
                                                raised={!newOrder.OrderDeliver}
                                                style={{
                                                    width: "20vw",
                                                    padding: "10px"
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="caption"
                                                >
                                                    Collect this movie from the
                                                    Epic Movie Store Physical
                                                    Location
                                                </Typography>
                                                <Button
                                                    variant={
                                                        !newOrder.OrderDeliver
                                                            ? "contained"
                                                            : "outlined"
                                                    }
                                                    color="inherit"
                                                    onClick={handlePickup}
                                                >
                                                    Pickup
                                                </Button>
                                            </Card>
                                        </Grid>
                                        <Grid item>
                                            <Card
                                                raised={newOrder.OrderDeliver}
                                                style={{
                                                    width: "20vw",
                                                    padding: "10px"
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="caption"
                                                >
                                                    Deliver movie to this
                                                    address: {props.userAddress}
                                                </Typography>
                                                <Button
                                                    variant={
                                                        newOrder.OrderDeliver
                                                            ? "contained"
                                                            : "outlined"
                                                    }
                                                    color="inherit"
                                                    onClick={handleDelivery}
                                                >
                                                    Deliver to Address
                                                </Button>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="h6">
                                        Shipping Method
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row  "
                                        spacing={8}
                                    >
                                        <Grid item>
                                            <Card
                                                raised={newOrder.OrderPaid}
                                                style={{
                                                    width: "20vw",
                                                    padding: "10px"
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="caption"
                                                >
                                                    Pay for this movie now
                                                </Typography>
                                                <Button
                                                    variant={
                                                        newOrder.OrderPaid
                                                            ? "contained"
                                                            : "outlined"
                                                    }
                                                    color="inherit"
                                                    onClick={handlePayNow}
                                                >
                                                    Pay Now
                                                </Button>
                                            </Card>
                                        </Grid>
                                        <Grid item>
                                            <Card
                                                raised={!newOrder.OrderPaid}
                                                style={{
                                                    width: "20vw",
                                                    padding: "10px"
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="caption"
                                                >
                                                    Pay for this movie at a
                                                    later date (must be within
                                                    the next 7 days)
                                                </Typography>
                                                <Button
                                                    variant={
                                                        !newOrder.OrderPaid
                                                            ? "contained"
                                                            : "outlined"
                                                    }
                                                    color="inherit"
                                                    onClick={handlePayLater}
                                                >
                                                    Pay Later
                                                </Button>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid
                                container
                                direction="column"
                                alignItems="baseline"
                                spacing={8}
                                style={{ padding: "15px" }}
                            >
                                <Typography variant="h5">
                                    Review Item
                                </Typography>
                                <Grid item>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Movie Title: {movie.movieName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Rating: {movie.movieRating}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Length: {movie.movieLength}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Genre: {movie.movieGenre}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid
                                container
                                direction="column"
                                alignItems="baseline"
                                spacing={8}
                                style={{ padding: "15px" }}
                            >
                                <Typography gutterBottom variant="h5">
                                    Order Total: {movie.moviePrice}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={handlePurchase}
                                >
                                    Confirm Purchase
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
};

export default NewOrder;
