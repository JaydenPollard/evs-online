import * as React from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import PropType from "prop-types";

/**
 * Displays a loading indicator with a customized message
 * @author Joshua (Chang-You) Wu
 */
const LoadingIndicator = props => {
    // Destructure props
    const { message } = props;
    // Render the view
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <CircularProgress
                thickness={3}
                size={80}
                variant="indeterminate"
                color="primary"
            />
            <Typography variant="h6">{message}</Typography>
        </Grid>
    );
};

// Declare prop types and enforce data type
LoadingIndicator.propTypes = {
    message: PropType.string.isRequired
};

export default LoadingIndicator;
