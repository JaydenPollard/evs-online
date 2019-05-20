import * as React from "react";
import { Paper, Typography, Grid, CardMedia, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import stockMovieImage from "../../../assests/stockMovieImage.jpg";

const imagePreviewStyle = {
    height: "200px",
    width: "140px"
};

const MovieManagementItem = props => {
    const { movie } = props;
    return (
        <Paper style={{ padding: 16 }}>
            <Grid container direction="row" spacing={16}>
                <Grid item>
                    <CardMedia
                        style={imagePreviewStyle}
                        title={movie.movieName}
                        image={stockMovieImage}
                    />
                </Grid>
                <Grid item style={{ width: 440 }}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Typography variant="subtitle1">
                            {movie.movieName}
                        </Typography>
                        <Typography variant="subtitle1">
                            {movie.moviePrice}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" spacing={8}>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography>Rating:</Typography>
                                <Typography>Length:</Typography>
                                <Typography>Genre:</Typography>
                                <Typography>Release Date:</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography>{movie.movieRating}</Typography>
                                <Typography>{movie.movieLength}</Typography>
                                <Typography>{movie.movieGenre}</Typography>
                                <Typography>
                                    {movie.movieReleaseDate}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec ultrices mattis risus. Duis congue lacus vel
                        vestibulum placerat. Cras ultricies aliquam dolor,
                        laoreet molestie ipsum. In quis odio vel enim rhoncus
                        egestas id eu urna. Maecenas in leo efficitur, volutpat
                        purus vitae, malesuada erat.
                    </Typography>
                    <Button
                        component={Link}
                        to={`/management/movie/${movie.movieID}/edit`}
                    >
                        Edit Movie Details
                    </Button>
                    <Button>Remove Movie</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MovieManagementItem;
