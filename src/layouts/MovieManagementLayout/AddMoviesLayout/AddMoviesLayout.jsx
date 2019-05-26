import * as React from "react";
import {
    Grid,
    Typography,
    Paper,
    TextField,
    CardMedia,
    Button,
    Fab
} from "@material-ui/core";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import NumberFormat from "react-number-format";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link, withRouter, Redirect } from "react-router-dom";
import AppBar from "../../../components/AppBar/AppBar";
import MoneyTextField from "../../../components/common/MoneyTextField";
import CustomDatePicker from "../../../components/common/CustomDatePicker";
import movie from "../../../models/movie";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import addMovie from "../../../logic/addMovie.function";
import LoadingIndicator from "../../../components/common/LoadingIndicator";
import MovieSelect from "./MovieSelect";

const imagePreviewStyle = {
    height: "336px",
    width: "200px"
};

const moviesLayoutStyle = {
    width: "50%",
    margin: "auto",
    marginTop: "16px",
    padding: "16px"
};

const fabStyle = {
    top: "auto",
    right: "auto",
    bottom: 10,
    left: 10,
    position: "fixed"
};

const AddMoviesLayout = props => {
    const [newMovie, setNewMovie] = React.useState(
        props.movie ? props.movie : movie
    );
    const [ratingError, setRatingError] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [showSubmittingIndicator, setSubmittingIndicator] = React.useState(
        false
    );
    const [addMovieSuccess, setAddMovieSuccess] = React.useState(false);

    function handleImageSelect(event) {
        event.preventDefault();

        const reader = new FileReader();
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
            reader.onloadend = () => {
                setNewMovie(movieData => {
                    return { ...movieData, movieImage: reader.result };
                });
            };
        }
    }

    function handleSnackbarClosing() {
        setOpenSnackbar(false);
    }

    if (addMovieSuccess) {
        return (
            <Redirect
                to={{ pathname: "/management/movie", addMovieSuccess: true }}
            />
        );
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <AppBar />
            <Typography variant="h2" style={{ marginTop: 16 }}>
                Add a Movie
            </Typography>
            <Typography variant="subtitle1">
                Enter the movie details here:
            </Typography>
            <Paper style={moviesLayoutStyle}>
                {showSubmittingIndicator ? (
                    <LoadingIndicator message="Adding Movie..." />
                ) : (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item style={{ marginRight: 16 }}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    {newMovie.movieImage ? (
                                        <React.Fragment>
                                            <CardMedia
                                                style={imagePreviewStyle}
                                                title="Uploaded Movie Image Preview"
                                                image={newMovie.movieImage}
                                            />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <AddPhotoAlternate
                                                style={{
                                                    transform: "scale(5)",
                                                    color: "white",
                                                    marginBottom: "40px"
                                                }}
                                            />
                                            <Typography variant="h6">
                                                Image Preview
                                            </Typography>
                                        </React.Fragment>
                                    )}
                                    <input
                                        id="upload-image-button"
                                        accept="image/*"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleImageSelect}
                                    />
                                    <label htmlFor="upload-image-button">
                                        <Button component="span">
                                            Upload Movie Image
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item style={{ width: "50%" }}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    component="form"
                                    spacing={8}
                                    onSubmit={async function(event) {
                                        event.preventDefault();
                                        if (!newMovie.movieImage) {
                                            setOpenSnackbar(true);
                                        } else if (!ratingError) {
                                            setSubmittingIndicator(true);
                                            // Submit movie to Firebase Database
                                            const addMovieSuccess = await addMovie(
                                                newMovie
                                            );
                                            if (addMovieSuccess) {
                                                setAddMovieSuccess(true);
                                            }
                                        }
                                    }}
                                >
                                    <Grid item>
                                        <TextField
                                            required
                                            id="movieName"
                                            name="movieName"
                                            label="Movie Name"
                                            fullWidth
                                            multiline
                                            value={newMovie.movieName}
                                            onChange={event => {
                                                setNewMovie(movieData => {
                                                    return {
                                                        ...movieData,
                                                        movieName:
                                                            event.target.value
                                                    };
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            error={ratingError}
                                            helperText={
                                                ratingError
                                                    ? "Rating is not valid"
                                                    : ""
                                            }
                                            required
                                            id="movieRating"
                                            name="movieRating"
                                            label="Movie Classification Rating"
                                            fullWidth
                                            value={newMovie.movieRating}
                                            onChange={event => {
                                                const rating =
                                                    event.target.value;

                                                setNewMovie(movieData => {
                                                    return {
                                                        ...movieData,
                                                        movieRating: rating
                                                    };
                                                });

                                                switch (rating) {
                                                    case "G":
                                                    case "PG":
                                                    case "M":
                                                    case "MA":
                                                    case "R":
                                                    case "X":
                                                        setRatingError(false);
                                                        break;
                                                    default:
                                                        setRatingError(true);
                                                        break;
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <NumberFormat
                                            customInput={TextField}
                                            format="###"
                                            required
                                            id="movieLength"
                                            name="movieLength"
                                            label="Movie Length (min)"
                                            fullWidth
                                            value={newMovie.movieLength}
                                            onChange={event =>
                                                setNewMovie(movieData => {
                                                    let movieLength = parseInt(
                                                        event.target.value
                                                    );
                                                    if (
                                                        movieLength &&
                                                        movieLength <= 0
                                                    ) {
                                                        movieLength = 1;
                                                    }
                                                    return {
                                                        ...movieData,
                                                        movieLength
                                                    };
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MovieSelect
                                            required
                                            id="movieGenre"
                                            name="movieGenre"
                                            label="Movie Genre"
                                            fullWidth
                                            multiline
                                            value={newMovie.movieGenre}
                                            onChange={event =>
                                                setNewMovie(movieData => {
                                                    return {
                                                        ...movieData,
                                                        movieGenre:
                                                            event.target.value
                                                    };
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <NumberFormat
                                            customInput={TextField}
                                            format="###"
                                            required
                                            id="movieStockCount"
                                            name="movieStockCount"
                                            label="Movie Stock Count"
                                            fullWidth
                                            value={newMovie.movieStockCount}
                                            onChange={event =>
                                                setNewMovie(movieData => {
                                                    return {
                                                        ...movieData,
                                                        movieStockCount: parseInt(
                                                            event.target.value
                                                        )
                                                    };
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MoneyTextField
                                            required
                                            id="moviePrice"
                                            name="moviePrice"
                                            label="Movie Price"
                                            fullWidth
                                            value={newMovie.moviePrice}
                                            onChange={event =>
                                                setNewMovie(movieData => {
                                                    return {
                                                        ...movieData,
                                                        moviePrice: Number(
                                                            event.target.value
                                                        ).toFixed(2)
                                                    };
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <CustomDatePicker
                                            id="movieReleaseDate"
                                            name="movieReleaseDate"
                                            label="Movie Release Date"
                                            setDate={setNewMovie}
                                            value={newMovie.movieReleaseDate}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="movieSummary"
                                            name="movieSummary"
                                            label="Movie Summary"
                                            fullWidth
                                            multiline
                                            value={newMovie.movieSummary}
                                            onChange={event => {
                                                setNewMovie(movieData => {
                                                    return {
                                                        ...movieData,
                                                        movieSummary:
                                                            event.target.value
                                                    };
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        style={{
                                            marginLeft: "auto",
                                            marginTop: 8
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            Add Movie
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Paper>
            <Fab
                variant="extended"
                style={fabStyle}
                component={Link}
                to="/management/movie"
            >
                <ArrowBack />
                Back
            </Fab>
            <ErrorSnackbar
                open={openSnackbar}
                onClose={handleSnackbarClosing}
                message="Missing movie image. Please add an image before adding the movie."
            />
        </Grid>
    );
};

export default withRouter(AddMoviesLayout);
