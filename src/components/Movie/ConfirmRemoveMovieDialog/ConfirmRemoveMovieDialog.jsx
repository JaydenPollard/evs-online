import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

/**
 * Creates a dialog for the user to confirm the removal of a selected movie
 * @param props The props being passed through in the component
 * @returns The view
 */
const ConfirmRemoveMovieDialog = props => {
    // Destructure props
    const { open, removeMovie } = props;
    // Render the view
    return (
        <Dialog open={open} onClose={removeMovie}>
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
                        removeMovie(false);
                    }}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        removeMovie(true);
                    }}
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Declare proptypes
ConfirmRemoveMovieDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    removeMovie: PropTypes.func.isRequired
};

export default ConfirmRemoveMovieDialog;
