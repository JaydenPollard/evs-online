import * as React from "react";
import MovieManagementItem from "./MovieManagementItem";
import { Grid } from "@material-ui/core";

const mockMovie = {
    movieName: "Movie Name",
    movieRating: "R",
    movieLength: "120 min",
    movieGenre: "Action",
    moviePrice: "$19.99"
};

const MovieManagementItemContainer = () => {
    return (
        <Grid item>
            <MovieManagementItem movie={mockMovie} />
        </Grid>
    );
};

export default MovieManagementItemContainer;
