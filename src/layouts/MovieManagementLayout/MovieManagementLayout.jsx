import * as React from "react";
import { Grid, Typography, Fab } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import AppBar from "../../components/AppBar/AppBar";
import MovieManagementItemContainer from "../../components/MovieManagement/MovieManagementItem/MovieManagementItemContainer";
import SearchMoviesInput from "./SearchMoviesInput/SearchMoviesInput";
import AddMovieSuccessDialog from "./AddMovieSuccessDialog";

const fabStyle = {
    top: "auto",
    right: 10,
    bottom: 10,
    left: "auto",
    position: "fixed"
};

const MovieManagementPage = props => {
    const addMovieSuccess = props.location.addMovieSuccess;

    return (
        <React.Fragment>
            {addMovieSuccess ? <AddMovieSuccessDialog open={true} /> : null}
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <AppBar />
                <Typography
                    variant="h2"
                    style={{ marginTop: 16, marginBottom: 8 }}
                >
                    Movie Management
                </Typography>
                <Typography variant="subtitle1">
                    Search for movies to manage:
                </Typography>
                <SearchMoviesInput />
                {/* Placeholders */}
                <MovieManagementItemContainer />
                <MovieManagementItemContainer />
                <MovieManagementItemContainer />
            </Grid>
            <Fab
                variant="extended"
                style={fabStyle}
                component={Link}
                to="/management/addmovie"
            >
                <Add />
                Add a Movie
            </Fab>
        </React.Fragment>
    );
};

export default withRouter(MovieManagementPage);
