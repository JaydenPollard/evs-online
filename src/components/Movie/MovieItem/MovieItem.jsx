import * as React from "react";
import { Paper, Typography, Grid, CardMedia, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    capitalizeString,
    formatDateToDateString
} from "../../../logic/common/utilities.function";
import ConfirmRemoveMovieDialog from "../ConfirmRemoveMovieDialog/ConfirmRemoveMovieDialog";
import removeMovie from "../../../logic/movie/removeMovie.function";
import InfoSnackbar from "../../common/InfoSnackbar";
import { buttonAlignment, imagePreviewStyle } from "./MovieItemStyles";

/**
 * Renders a movie item that the user can see and interact with
 * @param props The props being passed into the component
 * @returns a view
 */
const MovieItem = props => {
    const { movie, movieID, isStaff } = props;

    const [promptRemove, setPromptRemove] = React.useState(false);
    const [displaySnackbar, setDisplaySnackbar] = React.useState(false);

    // Handle button click for removing movie
    function handleRemoveMovieClick(event) {
        // Prevent page from refreshing
        event.preventDefault();
        setPromptRemove(true);
    }

    // Handle movie removal confirmation
    async function handleRemoveConfirmation(removeConfirm) {
        if (removeConfirm === true) {
            setPromptRemove(false);
            // Remove the movie from database and get removal success status
            const removeSuccess = await removeMovie(movieID);
            if (removeSuccess) {
                setDisplaySnackbar(removeSuccess);
            }
        }
    }

    // Do not render anything if the movie is hidden
    if (movie.movieHidden) {
        return null;
    }

    // Render the view
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
                            {capitalizeString(movie.movieName)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {/* Render price depending if it's free or not */}
                            {Number(movie.moviePrice) === 0
                                ? "FREE"
                                : `$${movie.moviePrice}`}
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
                                    {//Error occuring here when using formatDateToString when movie ordered
                                    new Date(
                                        movie.movieReleaseDate
                                    ).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                    {movie.movieStockCount} left
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography>Movie Synopsis:</Typography>
                    <Typography>{movie.movieSummary}</Typography>
                </Grid>
            </Grid>
            <Grid style={buttonAlignment}>
                {/* Render button options depending on the user type */}
                {isStaff ? (
                    <React.Fragment>
                        <Button
                            component={Link}
                            to={{
                                pathname: "/management/movie",
                                toEditMovie: movie,
                                movieID,
                                isStaff
                            }}
                        >
                            Edit Movie Details
                        </Button>
                        <Button onClick={handleRemoveMovieClick}>
                            Remove Movie
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {movie.movieStockCount > 0 ? (
                            <Button
                                component={Link}
                                to={{
                                    pathname: "/order/new",
                                    movie,
                                    movieID
                                }}
                            >
                                Purchase Movie
                            </Button>
                        ) : (
                            <Button disabled>Out of Stock</Button>
                        )}
                    </React.Fragment>
                )}
            </Grid>
            <ConfirmRemoveMovieDialog
                open={promptRemove}
                removeMovie={handleRemoveConfirmation}
            />
            <InfoSnackbar
                open={displaySnackbar}
                onClose={() => {
                    setDisplaySnackbar(false);
                }}
                message="Movie removed. Refresh to see the changes."
            />
        </Paper>
    );
};

// Declare proptypes
MovieItem.propTypes = {
    movie: PropTypes.object.isRequired,
    movieID: PropTypes.string.isRequired,
    isStaff: PropTypes.bool.isRequired
};

export default MovieItem;
