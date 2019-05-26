import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

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
    return (
        <FormControl fullWidth required>
            <InputLabel>Genre</InputLabel>
            <Select value={props.value} onChange={props.onChange}>
                {movieGenres.map(movieGenre => (
                    <MenuItem key={movieGenre} value={movieGenre}>
                        {movieGenre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MovieSelect;
