import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar";
import MovieManagementItemContainer from "../../components/MovieManagement/MovieManagementItem/MovieManagementItemContainer";
import SearchMoviesInput from "./SearchMoviesInput/SearchMoviesInput";

const MovieManagementPage = () => {
    return (
        <React.Fragment>
            <AppBar />
            <Typography variant="h2">Movie Management</Typography>
            <Typography component={Link} to="/management/addmovie">
                Add Movie (WIP)
            </Typography>
            <SearchMoviesInput />
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
