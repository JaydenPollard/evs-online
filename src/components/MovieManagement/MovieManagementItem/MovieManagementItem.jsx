import * as React from "react";
import { Paper, Typography, Grid, CardMedia, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from "lodash";

const imagePreviewStyle = {
    height: "200px",
    width: "140px"
};

const buttonAlignment = {
    textAlign: "right",
    displayInline: "block"
};

const MovieManagementItem = props => {
    const { movie } = props;
    if (movie.movieHidden) {
        return null;
    }
    return (
        <Paper style={{ padding: 16 }}>
            <Grid container direction="row" spacing={16}>
                <Grid item>
                    <CardMedia
                        component="img"
                        style={imagePreviewStyle}
                        title={movie.movieName}
                        src={movie.movieImage}
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
                            {movie.movieName.replace(/\w+/g, _.capitalize)}
                        </Typography>
                        <Typography variant="subtitle1">
                            ${movie.moviePrice}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" spacing={8}>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography>Rating:</Typography>
                                <Typography>Length:</Typography>
                                <Typography>Genre:</Typography>
                                <Typography>Release Date:</Typography>
                                <Typography>Stock:</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography>{movie.movieRating}</Typography>
                                <Typography>{movie.movieLength} min</Typography>
                                <Typography>{movie.movieGenre}</Typography>
                                <Typography>
                                    {movie.movieReleaseDate}
                                </Typography>
                                <Typography>
                                    {movie.movieStockCount} left
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography>{movie.movieSummary}</Typography>
                </Grid>
            </Grid>
            <Grid style={buttonAlignment}>
                {props.isStaff ? (
                    <React.Fragment>
                        <Button
                            component={Link}
                            to={"/management/movie/modifymovie/"}
                        >
                            Edit Movie Details
                        </Button>
                        <Button>Remove Movie</Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {movie.movieStockCount > 0 ? (
                            <Button>Purchase Movie</Button>
                        ) : (
                            <Button disabled>Out of Stock</Button>
                        )}
                    </React.Fragment>
                )}
            </Grid>
        </Paper>
    );
};

export default MovieManagementItem;
