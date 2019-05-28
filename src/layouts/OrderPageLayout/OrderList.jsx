import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
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
                {result.orders.length > 0 ? (
                    result.orders.map(order => (
                        <OrderItem orderId={order[0]} order={order[1]} />
                    ))
                ) : (
                    <Typography gutterBottom variant="subtitle1">
                        No orders found!
                    </Typography>
                )}
            </Grid>
        );
    }
};

const mapStateToProps = state => {
    return { result: state.orderRetrievalResult };
};

export default connect(mapStateToProps)(OrderList);
