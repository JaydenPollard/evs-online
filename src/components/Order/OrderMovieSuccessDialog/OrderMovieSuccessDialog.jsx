import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent
} from "@material-ui/core";
import PropTypes from "prop-types";

const OrderMovieSuccessDialogStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
};

const OrderMovieSuccessDialog = props => {
    const { open } = props;
    const [isOpen, setIsOpen] = React.useState(open);

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="sm"
            style={OrderMovieSuccessDialogStyle}
        >
            <DialogTitle>Order Complete!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your order has been submitted! Check it's status in your
                    order history!
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

OrderMovieSuccessDialog.propTypes = {
    open: PropTypes.bool.isRequired
};

export default OrderMovieSuccessDialog;
