import * as React from "react";
import {
    InputBase,
    Paper,
    IconButton,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Divider
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { requestSearchCatalogue } from "../../../reducers/search-catalogue/search-catalogue-actions";
import MovieSelect from "../MovieSelect/MovieSelect";
import { searchMoviesInputStyle } from "./SearchMoviesInputStyles";

/**
 * Renders a search box for the user to search either with keywords or by genres
 * @param props Variables being passed into the component
 * @returns the view
 */
const SearchMoviesInput = props => {
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [searchByGenre, setSearchByGenre] = React.useState(false);

    // Handle search
    function handleSearch(event) {
        // Prevent page from refreshing
        event.preventDefault();
        // Dispatch a redux action to search for movies
        props.requestSearchCatalogue(searchKeywords, searchByGenre);
    }

    // Handling search input change
    const handleSearchInput = event => {
        setSearchKeywords(event.target.value);
    };

    // Render the view
    return (
        <Paper style={searchMoviesInputStyle}>
            <form style={{ display: "flex" }} onSubmit={handleSearch}>
                {/* Display a dropdown or search field depending on the search type */}
                {searchByGenre ? (
                    <MovieSelect
                        displayLabel
                        onChange={handleSearchInput}
                        value={searchKeywords}
                        fullWidth
                    />
                ) : (
                    <InputBase
                        onChange={handleSearchInput}
                        value={searchKeywords}
                        placeholder="Search for movies..."
                        fullWidth
                    />
                )}
                <IconButton component="button" type="submit">
                    <Search />
                </IconButton>
            </form>
            <Divider />
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={searchByGenre}
                            onChange={event => {
                                setSearchByGenre(event.target.checked);
                            }}
                        />
                    }
                    label="Search by Genre"
                />
            </FormGroup>
        </Paper>
    );
};

/**
 * Map the dispatch to redux
 * @param dispatch dispatch a Redux Action
 * @returns the action we can dispatch
 */
function mapDispatchToProps(dispatch) {
    return {
        requestSearchCatalogue: (searchKeywords, searchByGenre) =>
            dispatch(requestSearchCatalogue(searchKeywords, searchByGenre))
    };
}

// Declare prop types
SearchMoviesInput.propTypes = {
    requestSearchCatalogue: PropTypes.func
};

// Connect component to Redux
export default connect(
    null,
    mapDispatchToProps
)(SearchMoviesInput);
