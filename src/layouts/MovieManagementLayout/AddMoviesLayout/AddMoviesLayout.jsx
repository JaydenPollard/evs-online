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

    const [movieImage, setMovieImage] = React.useState();
    const [moviePrice, setMoviePrice] = React.useState();
    const [movieReleaseDate, setMovieReleaseDate] = React.useState(new Date());

    const handleImageSelect = event => {
        event.preventDefault();

        const reader = new FileReader();
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
            reader.onloadend = () => {
                setMovieImage(reader.result);
            };
        }
    };

    const handleMoviePriceChange = event => {
        setMoviePrice(event.target.value);
    };

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
                                {movieImage ? (
                                    <CardMedia
                                        style={imagePreviewStyle}
                                        title="Uploaded Movie Image Preview"
                                        image={movieImage}
                                    />
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
                                onSubmit={() => {
                                    console.log("help");
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
                                    <TextField
                                        required
                                        id="movieRating"
                                        name="movieRating"
                                        label="Movie Rating (1~10)"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        id="movieLength"
                                        name="movieLength"
                                        label="Movie Length (min)"
                                        fullWidth
                                        autoComplete="movieLength"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        id="movieGenre"
                                        name="movieGenre"
                                        label="Movie Genre"
                                        fullWidth
                                        multiline
                                        autoComplete="movieGenre"
                                    />
                                </Grid>
                                <Grid item>
                                    <MoneyTextField
                                        required
                                        id="moviePrice"
                                        name="moviePrice"
                                        label="Movie Price"
                                        fullWidth
                                        autoComplete="moviePrice"
                                        value={moviePrice}
                                        onChange={handleMoviePriceChange}
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
