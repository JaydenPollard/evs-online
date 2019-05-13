import * as React from "react";
import { Paper, Typography, Grid, CardMedia, Button } from "@material-ui/core";
import stockMovieImage from "../../../assests/stockMovieImage.jpg";

const style = {
    padding: "16px"
};

const MovieManagementItem = props => {
    const { movie } = props;
    return (
        <Paper style={style}>
            <Grid container direction="row" spacing={16}>
                <Grid item>
                    <CardMedia
                        style={{ height: 200, width: 140 }}
                        title={movie.movieName}
                        image={stockMovieImage}
                    />
                </Grid>
                <Grid item style={{ width: 440 }}>
                    <Typography variant="subtitle1">
                        {movie.movieName}
                    </Typography>
                    <Typography variant="subtitle1">
                        {movie.moviePrice}
                    </Typography>
                    <Grid container direction="row" spacing={8}>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography>Rating:</Typography>
                                <Typography>Length:</Typography>
                                <Typography>Genre:</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography>{movie.movieRating}</Typography>
                                <Typography>{movie.movieLength}</Typography>
                                <Typography>{movie.movieGenre}</Typography>
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
                    <Button>Edit Movie Details</Button>
                    <Button>Remove Movie</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MovieManagementItem;
