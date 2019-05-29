import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import OrderItem from "../../components/Order/OrderItem/OrderItem";

async function getMovie(movieId) {
    let movie = {};
    const movieRef = firebase.database.ref("Movie");
    const movieQuery = movieRef.child(movieId);

    await movieQuery.once("value", function(snapshot) {
        if (snapshot.val()) {
            movie = snapshot.val();
        }
    });
    return movie;
}

const OrderList = ({ result }) => {
    if (result.isLoading) {
        return "";
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
                        <OrderItem
                            key={order[0]}
                            orderId={order[0]}
                            order={order[1]}
                            movie={getMovie(order[1].MovieID)}
                        />
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
