import * as React from "react";
import { Snackbar, SnackbarContent, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PropType from "prop-types";

/**
 * Display an information snackbar for the user with a customized message
 * @author Joshua (Chang-You) Wu
 */
const InfoSnackbar = props => {
    const { open, onClose, message } = props;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            autoHideDuration={6000}
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
                        <InfoIcon style={{ marginRight: 8 }} />
                        <Typography color="inherit">{message}</Typography>
                    </span>
                }
            />
        </Snackbar>
    );
};

// Declare prop types and enforce data type
InfoSnackbar.propTypes = {
    message: PropType.string.isRequired,
    open: PropType.bool.isRequired,
    onClose: PropType.func.isRequired
};

export default InfoSnackbar;
