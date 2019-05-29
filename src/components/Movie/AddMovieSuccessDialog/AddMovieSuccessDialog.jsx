import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent
} from "@material-ui/core";
import PropTypes from "prop-types";

const AddMovieSuccessDialogStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
};

const AddMovieSuccessDialog = props => {
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
            style={AddMovieSuccessDialogStyle}
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

AddMovieSuccessDialog.propTypes = {
    open: PropTypes.bool.isRequired
};

export default AddMovieSuccessDialog;
