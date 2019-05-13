import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import MovieManagementItemContainer from "../../components/MovieManagement/MovieManagementItem/MovieManagementItemContainer";

const MovieManagementPage = () => {
    return (
        <React.Fragment>
            <AppBar />
            <Typography component={Link} to="/management/addmovie">
                Add Movie
            </Typography>
            <Typography component={Link} to="/management/searchmovie">
                Search Movies
            </Typography>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={8}
            >
                {/* Placeholders */}
                <MovieManagementItemContainer />
                <MovieManagementItemContainer />
                <MovieManagementItemContainer />
            </Grid>
        </React.Fragment>
    );
};

export default MovieManagementPage;
