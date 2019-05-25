import * as React from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

const LoadingIndicator = props => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <CircularProgress
                thickness={3}
                size={80}
                variant="indeterminate"
                color="primary"
            />
            <Typography variant="h6">{props.message}</Typography>
        </Grid>
    );
};

export default LoadingIndicator;
