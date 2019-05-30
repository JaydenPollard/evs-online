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

/**
 * Renders a success dialog that displays order success message
 * @param props The props being passed into the component
 * @returns a view
 */
const OrderMovieSuccessDialog = props => {
    const { open } = props;
    const [isOpen, setIsOpen] = React.useState(open);

    //Function that handles when dialog is clicked outside of
    function handleClose() {
        setIsOpen(false);
    }

    //Render the dialog view
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
