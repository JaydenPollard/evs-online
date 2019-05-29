import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

// Declare the movie genres
const movieGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film Noir",
    "Game Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Superhero",
    "Talk Show",
    "Thriller",
    "War",
    "Western"
];

/**
 * Displays a movie selection dropdown for the user to use
 * @param props Props being passed in from another component
 * @returns the view
 */
const MovieSelect = props => {
    const { value, onChange } = props;
    // Render the view
    return (
        <FormControl fullWidth required>
            <InputLabel>Genre</InputLabel>
            <Select value={value} onChange={onChange}>
                {/* Map each individual genre inside the array as a menu item */}
                {movieGenres.map(movieGenre => (
                    <MenuItem key={movieGenre} value={movieGenre}>
                        {movieGenre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

// Declare prop types
MovieSelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MovieSelect;
