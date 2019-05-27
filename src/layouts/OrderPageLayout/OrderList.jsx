import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { connect } from "react-redux";
import {
    Grid,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Button
} from "@material-ui/core";
import OrderItem from "./OrderItem";

const OrderList = ({ result }) => {
    if (result.isLoading) {
        return <Typography>Loading...</Typography>;
    } else {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={8}
            >
                {Object.entries(result.orders).map(order => (
                    <OrderItem orderId={order[0]} order={order[1]} />
                ))}
            </Grid>
        );
    }
};

const mapStateToProps = state => {
    return { result: state.orderRetrievalResult };
};

export default connect(mapStateToProps)(OrderList);
