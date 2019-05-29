import * as React from "react";
import { Snackbar, SnackbarContent, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import PropType from "prop-types";

/**
 * Displays an error snackbar with a customized message for the user to see
 * @author Joshua (Chang-You) Wu
 */
const ErrorSnackbar = props => {
    // Destructure props
    const { open, onClose, message } = props;
    // Render the view
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            autoHideDuration={5000}
            open={open}
            onClose={onClose}
        >
            <SnackbarContent
                message={
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <ErrorIcon style={{ marginRight: 8 }} />
                        <Typography color="inherit">{message}</Typography>
                    </span>
                }
            />
        </Snackbar>
    );
};

// Declare prop types and enforce data type
ErrorSnackbar.propTypes = {
    message: PropType.string.isRequired,
    open: PropType.bool.isRequired,
    onClose: PropType.func.isRequired
};

export default ErrorSnackbar;
