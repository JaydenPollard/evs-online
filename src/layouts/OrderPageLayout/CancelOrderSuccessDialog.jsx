import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent
} from "@material-ui/core";
import PropTypes from "prop-types";

const CancelOrderSuccessDialogStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
};

const CancelOrderSuccessDialog = props => {
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
            style={CancelOrderSuccessDialogStyle}
        >
            <DialogTitle>Order Cancelled!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your order has been cancelled.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

CancelOrderSuccessDialog.propTypes = {
    open: PropTypes.bool.isRequired
};

export default CancelOrderSuccessDialog;
