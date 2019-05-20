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

const AddMoviesLayout = () => {
    const moviesLayoutStyle = {
        width: "80%",
        margin: "auto",
        marginTop: "16px",
        padding: "16px"
    };

    return (
        <React.Fragment>
            <AppBar />
            <Paper style={moviesLayoutStyle}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={8}
                >
                    <Typography variant="h3">Add a Movie</Typography>
                    <Typography variant="subtitle1">
                        Enter the movie details here:
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <CardMedia
                            style={imagePreviewStyle}
                            title="Uploaded Movie Image Preview"
                            image={stockMovieImage}
                        />
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
                                <Button>Add Movie</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
};

export default AddMoviesLayout;
