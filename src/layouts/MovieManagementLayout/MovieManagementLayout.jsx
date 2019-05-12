import * as React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";

const MovieManagementPage = () => {
    return (
        <React.Fragment>
            <AppBar />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Link to="/management/addmovie">Add Movie</Link>
                <Link to="/management/searchmovie">Search Movies</Link>
            </Grid>
        </React.Fragment>
    );
};

export default MovieManagementPage;
