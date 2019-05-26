import * as React from "react";
import MovieManagementItem from "./MovieManagementItem";
import { Grid } from "@material-ui/core";

const mockMovie = {
    movieID: "M123",
    movieName: "Movie Name",
    movieRating: "R",
    movieLength: 120,
    movieGenre: "Action",
    movieStockCount: 10,
    moviePrice: 19.99,
    movieReleaseDate: "04/05/2018",
    movieSummary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mattis risus. Duis congue lacus vel vestibulum placerat. Cras ultricies aliquam dolor, laoreet molestie ipsum. In quis odio vel enim rhoncus egestas id eu urna. Maecenas in leo efficitur, volutpat purus vitae, malesuada erat."
};

const MovieManagementItemContainer = () => {
    return (
        <Grid item style={{ margin: 8 }}>
            <MovieManagementItem movie={mockMovie} />
        </Grid>
    );
};

export default MovieManagementItemContainer;
