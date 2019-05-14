import * as React from "react";
import {
    Grid,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";

const OrderPage = () => {
    return (
        <React.Fragment>
            <AppBar />
            <Grid container>
                <Typography component="h1" gutterBottom>
                    Order Details
                </Typography>
                <Table>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>#123456789</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Sam Sample</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Movies Ordered</TableCell>
                        <TableCell>
                            Harry Potter and the Prisoner of Azkaban
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total Price</TableCell>
                        <TableCell>$23.99</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Paypal</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Destination Address</TableCell>
                        <TableCell>42 Wallaby Way, Sydney</TableCell>
                    </TableRow>
                </Table>
                <Button variant="containted" color="primary">
                    Finish Order
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default OrderPage;
