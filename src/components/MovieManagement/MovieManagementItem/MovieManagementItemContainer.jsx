import * as React from "react";
import MovieManagementItem from "./MovieManagementItem";
import { Grid } from "@material-ui/core";

const mockMovie = {
    movieID: "M123",
    movieName: "Movie Name",
    movieRating: "R",
    movieLength: "120 min",
    movieGenre: "Action",
    moviePrice: "$19.99",
    movieReleaseDate: "04/05/2018"
};

const MovieManagementItemContainer = () => {
    return (
        <Grid item style={{ margin: 8 }}>
            <MovieManagementItem movie={mockMovie} />
        </Grid>
    );
};

export default MovieManagementItemContainer;
