import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent
} from "@material-ui/core";
import PropTypes from "prop-types";
import { SetMovieSuccessDialogStyle } from "./SetMovieSuccessDialogStyles";

/**
 * Displays an add movie success dialog to the user
 * @param props The props being passed into the component
 * @returns The React view
 */
const SetMovieSuccessDialog = props => {
    // Destructure props
    const { open } = props;
    const [isOpen, setIsOpen] = React.useState(open);

    // Handle closing the dialog
    function handleClose() {
        setIsOpen(false);
    }

    // Render the view
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="sm"
            style={SetMovieSuccessDialogStyle}
        >
            <DialogTitle>Operation Success!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your changes has been successfully made! Please refresh to
                    see your changes.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

// Declare proptypes types
SetMovieSuccessDialog.propTypes = {
    open: PropTypes.bool.isRequired
};

export default SetMovieSuccessDialog;
