import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

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

const MovieSelect = props => {
    const { value, onChange } = props;
    return (
        <FormControl fullWidth required>
            <InputLabel>Genre</InputLabel>
            <Select value={value} onChange={onChange}>
                {movieGenres.map(movieGenre => (
                    <MenuItem key={movieGenre} value={movieGenre}>
                        {movieGenre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

MovieSelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MovieSelect;
