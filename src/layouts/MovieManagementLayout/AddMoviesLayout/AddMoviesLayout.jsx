import * as React from "react";
import {
    Grid,
    Typography,
    Paper,
    TextField,
    CardMedia,
    Button
} from "@material-ui/core";
import AppBar from "../../../components/AppBar/AppBar";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import MoneyTextField from "../../../components/common/MoneyTextField";
import CustomDatePicker from "../../../components/common/CustomDatePicker";
import movie from "../../../models/movie";
import NumberFormat from "react-number-format";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";

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

const AddMoviesLayout = () => {
    const [newMovie, setNewMovie] = React.useState(movie);
    const [ratingError, setRatingError] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

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

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <AppBar />
            <ErrorSnackbar
                open={openSnackbar}
                onClose={handleSnackbarClosing}
                message="Missing movie image. Please add an image before adding the movie."
            />
            <Typography variant="h2" style={{ marginTop: 16 }}>
                Add a Movie
            </Typography>
            <Typography variant="subtitle1">
                Enter the movie details here:
            </Typography>
            <Paper style={moviesLayoutStyle}>
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
                                alignItems="stretch"
                                component="form"
                                spacing={8}
                                onSubmit={event => {
                                    event.preventDefault();
                                    if (!newMovie.movieImage) {
                                        setOpenSnackbar(true);
                                    } else if (!ratingError) {
                                        // Submit to Firebase Database
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
                                    />
                                </Grid>
                                <Grid item>
                                    <NumberFormat
                                        customInput={TextField}
                                        error={ratingError}
                                        helperText={
                                            ratingError
                                                ? "Rating must be between 1 to 10"
                                                : ""
                                        }
                                        format="##"
                                        required
                                        id="movieRating"
                                        name="movieRating"
                                        label="Movie Rating (1~10)"
                                        fullWidth
                                        value={newMovie.movieRating}
                                        onChange={event => {
                                            const rating = event.target.value;
                                            setNewMovie(movieData => {
                                                return {
                                                    ...movieData,
                                                    movieRating: rating
                                                };
                                            });

                                            if (rating < 1 || rating > 10) {
                                                setRatingError(true);
                                            } else {
                                                setRatingError(false);
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
                                                let movieLength =
                                                    event.target.value;
                                                console.log(movieLength);
                                                if (
                                                    movieLength &&
                                                    movieLength <= 0
                                                ) {
                                                    movieLength = 1;
                                                }
                                                console.log(movieLength);
                                                return {
                                                    ...movieData,
                                                    movieLength: movieLength
                                                };
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        id="movieGenres"
                                        name="movieGenres"
                                        label="Movie Genres"
                                        fullWidth
                                        multiline
                                        value={newMovie.movieGenres}
                                        onChange={event =>
                                            setNewMovie(movieData => {
                                                return {
                                                    ...movieData,
                                                    movieGenres:
                                                        event.target.value
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
                                                    moviePrice:
                                                        event.target.value
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
                                <Grid
                                    item
                                    style={{ marginLeft: "auto", marginTop: 8 }}
                                >
                                    <Button type="submit" variant="contained">
                                        Add Movie
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default AddMoviesLayout;
