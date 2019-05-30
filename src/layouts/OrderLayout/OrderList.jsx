import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import OrderItem from "../../components/Order/OrderItem/OrderItem";
import isMemberStaff from "../../logic/common/firebaseauth.function";
import getCurrentUser from "../../logic/common/firebaseauth.function";

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
    const [isStaff, setIsStaff] = React.useState(true);

    useEffect(() => {
        async function isUserStaff() {
            setIsStaff(await isMemberStaff());
        }
        // Set to false if failed
        isUserStaff().catch(() => {
            setIsStaff(false);
        });
    }, []);

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
                            isStaff={isStaff}
                            currentUser={getCurrentUser()}
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
