import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import NewOrder from "./NewOrder";

const OrderManagementPage = () => {
    return (
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={12}
            >
                <AppBar />
                <Typography
                    variant="h2"
                    style={{ marginTop: 16, marginBottom: 8 }}
                >
                    Order Management
                </Typography>

                <Button variant="contained" color="inherit">
                    <Link to="/order/search" style={{ textDecoration: "none" }}>
                        View all orders
                    </Link>
                </Button>

                <Typography
                    variant="h5"
                    style={{ marginTop: 16, marginBottom: 8 }}
                >
                    Test Orders
                </Typography>

                <Button variant="contained" color="inherit">
                    <Link
                        to={{
                            pathname: "/order/new",
                            state: {
                                movieId: "-LfrT4YDzSHi5BOY9HJC",
                                movieName: "the dark knight",
                                movieRating: "M",
                                movieLength: "150",
                                movieGenre: "Horror",
                                moviePrice: "19.99"
                            }
                        }}
                        style={{ textDecoration: "none" }}
                    >
                        The Dark Knight
                    </Link>
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default OrderManagementPage;
