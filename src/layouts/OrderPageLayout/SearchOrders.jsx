import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AppBar from "../../components/AppBar/AppBar";
import OrderList from "./OrderList";
import SearchOrderInput from "./SearchOrderInput";

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
            </Grid>
        </React.Fragment>
    );
};

export default SearchOrders;
