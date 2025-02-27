import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Divider,
    Card,
    Fab
} from "@material-ui/core";
import { Link, withRouter, Redirect } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import AppBar from "../../../components/AppBar/AppBar";
import order from "../../../models/order";
import createOrder from "../../../logic/order/createOrder.function";
import setMovie from "../../../logic/movie/setMovie.function";
import getCurrentUser from "../../../logic/common/firebaseauth.function";
import { fabStyle, cardStyle, paperStyle, gridStyle } from "./NewOrderStyles";

/**
 * Display the new order page, allow user to create order
 * @param props props passed to component
 * @returns the new order view
 */
const NewOrder = props => {
    const { location } = props;
    const { movie, movieID } = location;
    const [newOrder, setNewOrder] = useState(order);
    const [orderMovieSuccess, setOrderMovieSuccess] = useState(false);

    //Function that handles when delivery option selected
    function handleDelivery() {
        setNewOrder(orderData => {
            return { ...orderData, OrderDeliver: true };
        });
    }

    //Function that handles when pickup option selected
    function handlePickup() {
        setNewOrder(orderData => {
            return { ...orderData, OrderDeliver: false };
        });
    }

    //Function that handles when pay now option selected
    function handlePayNow() {
        setNewOrder(orderData => {
            return { ...orderData, OrderPaid: true };
        });
    }

    //Function that handles when pay later option selected
    function handlePayLater() {
        setNewOrder(orderData => {
            return { ...orderData, OrderPaid: false };
        });
    }

    //Function that handles when the confirm purchase button is clicked
    async function handlePurchase() {
        const status = newOrder.OrderPaid ? "Order Pending" : "Pending Payment";
        const changeOrder = newOrder;

        //Get the current user, if not logged in set customerId to anon
        const currentUser = await getCurrentUser();
        if (currentUser) {
            changeOrder.CustomerID = currentUser.uid;
        } else {
            changeOrder.CustomerID = "anon";
        }

        changeOrder.MovieID = movieID;
        changeOrder.OrderStatus = status;
        changeOrder.OrderPrice = movie.moviePrice;

        //Create new order in firebase and set success
        const success = await createOrder(changeOrder);
        if (success) {
            movie.movieStockCount--;
            const removeStockSuccess = await setMovie(movie, movieID);
            if (removeStockSuccess) {
                setOrderMovieSuccess(true);
            }
        }
    }

    //Rendering conditions, redirect to home if success or movie not found
    if (orderMovieSuccess) {
        movie.movieReleaseDate = new Date(movie.movieReleaseDate);
        return <Redirect to={{ pathname: "/", orderMovieSuccess: true }} />;
    } else if (!movie) {
        return <Redirect to="/" />;
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
                        <Paper style={paperStyle}>
                            <Grid
                                container
                                direction="column"
                                alignItems="baseline"
                                spacing={10}
                                style={gridStyle}
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
                                                style={cardStyle}
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
                                                style={cardStyle}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="caption"
                                                >
                                                    Deliver movie to your home
                                                    address
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
                                                style={cardStyle}
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
                                                style={cardStyle}
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
                                style={gridStyle}
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
                                        Length: {movie.movieLength} min
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
                                style={gridStyle}
                            >
                                <Typography gutterBottom variant="h5">
                                    Order Total: ${movie.moviePrice}
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
                    <Fab
                        variant="extended"
                        style={fabStyle}
                        component={Link}
                        to="/"
                    >
                        <ArrowBack />
                        Back
                    </Fab>
                </Grid>
            </React.Fragment>
        );
    }
};

NewOrder.propTypes = {
    location: PropTypes.object
};

export default withRouter(NewOrder);
