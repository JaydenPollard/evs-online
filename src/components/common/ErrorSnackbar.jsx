import * as React from "react";
import { Snackbar, SnackbarContent, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

const ErrorSnackbar = props => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            autoHideDuration={5000}
            open={props.open}
            onClose={props.onClose}
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
                        <Typography color="inherit">{props.message}</Typography>
                    </span>
                }
            />
        </Snackbar>
    );
};

export default ErrorSnackbar;
