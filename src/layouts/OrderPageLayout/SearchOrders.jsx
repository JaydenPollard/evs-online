import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "../../components/AppBar/AppBar";
import { requestAllOrdersRetrieval } from "../../reducers/order-retrieval/order-retrieval-actions";
import OrderList from "./OrderList";

const SearchOrders = props => {
    // TODO: Search orders based on userID if logged in, else search all orders
    props.requestAllOrdersRetrieval();
    return (
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <AppBar />
                <Typography
                    variant="h2"
                    style={{ marginTop: 16, marginBottom: 8 }}
                >
                    Search Orders
                </Typography>
                <OrderList />
            </Grid>
        </React.Fragment>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        requestAllOrdersRetrieval: () => dispatch(requestAllOrdersRetrieval())
    };
}

SearchOrders.propTypes = {
    requestAllOrdersRetrieval: PropTypes.func
};

SearchOrders.defaultProps = {
    requestAllOrdersRetrieval: () => {}
};

export default connect(
    null,
    mapDispatchToProps
)(SearchOrders);
