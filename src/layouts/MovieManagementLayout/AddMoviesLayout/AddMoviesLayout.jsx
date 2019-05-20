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
import stockMovieImage from "../../../assests/stockMovieImage.jpg";

const imagePreviewStyle = {
    height: "336px",
    width: "200px",
    marginRight: "16px"
};

const moviesLayoutStyle = {
    width: "40%",
    margin: "auto",
    marginTop: "16px",
    padding: "16px"
};

const AddMoviesLayout = () => {
    // Have to make it a readable format..
    // https://codepen.io/hartzis/pen/VvNGZP
    const [movieImage, setMovieImage] = React.useContext(stockMovieImage);

    const handleImageSelect = event => {
        event.preventDefault();

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => {
            setMovieImage(reader.result);
        };
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
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <Grid item>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <CardMedia
                                    style={imagePreviewStyle}
                                    title="Uploaded Movie Image Preview"
                                    image={movieImage}
                                />
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
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing={8}
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
                        </Grid>
                    </Grid>
                </Grid>
                <Button style={{ float: "right" }}>Add Movie</Button>
            </Paper>
        </Grid>
    );
};

export default AddMoviesLayout;
