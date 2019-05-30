import React from "react";
import { Grid, Typography, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AppBar from "../../components/AppBar/AppBar";
import OrderList from "./OrderList";
import SearchOrderInput from "../../components/Order/SearchOrderInput/SearchOrderInput";

//Styling for fab component
const fabStyle = {
    top: "auto",
    right: "auto",
    bottom: 10,
    left: 10,
    position: "fixed"
};

/**
 * Displays the base search order page
 * @param props props passed to component
 * @returns search order view
 */
const SearchOrders = props => {
    return (
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={8}
            >
                <AppBar />
                <Typography
                    variant="h3"
                    style={{ marginTop: 16, marginBottom: 8 }}
                >
                    Order History
                </Typography>
                <SearchOrderInput />
                <OrderList />
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
};

export default SearchOrders;
