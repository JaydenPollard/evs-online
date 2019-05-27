import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const ConfirmRemoveMovieDialog = props => {
    const { open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Remove this Movie?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure that you want to remove this movie?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        onClose(false);
                    }}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        onClose(true);
                    }}
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmRemoveMovieDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ConfirmRemoveMovieDialog;
