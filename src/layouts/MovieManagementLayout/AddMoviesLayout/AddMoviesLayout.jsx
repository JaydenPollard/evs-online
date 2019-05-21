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

const imagePreviewStyle = {
    height: "336px",
    width: "200px"
};

const moviesLayoutStyle = {
    width: "40%",
    margin: "auto",
    marginTop: "16px",
    padding: "16px"
};

const AddMoviesLayout = () => {
    const [movieImage, setMovieImage] = React.useState();

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
                    spacing={8}
                    style={{ marginBottom: 16 }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={40}
                    >
                        <Grid item>
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
                        <Grid item>
                            <form
                                onSubmit={() => {
                                    console.log("help");
                                }}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={8}
                                    style={{ marginBottom: 24 }}
                                >
                                    <Grid item>
                                        <TextField
                                            required
                                            id="movieName"
                                            name="movieName"
                                            label="Movie Name"
                                            fullWidth
                                            autoComplete="movieName"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="movieRating"
                                            name="movieRating"
                                            label="Movie Rating (1~10)"
                                            fullWidth
                                            autoComplete="movieRating"
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
                                            autoComplete="movieGenre"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="moviePrice"
                                            name="moviePrice"
                                            label="Movie Price"
                                            fullWidth
                                            autoComplete="moviePrice"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="movieReleaseDate"
                                            name="movieReleaseDate"
                                            label="Movie Release Date"
                                            fullWidth
                                            autoComplete="movieReleaseDate"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ float: "right" }}
                                >
                                    Add Movie
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default AddMoviesLayout;
