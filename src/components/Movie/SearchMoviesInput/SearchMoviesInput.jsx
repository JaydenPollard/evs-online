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

const searchMoviesInputStyle = {
    width: "40%",
    margin: "auto",
    marginBottom: "16px",
    padding: "4px 16px"
};

const SearchMoviesInput = props => {
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [searchByGenre, setSearchByGenre] = React.useState(false);

    function handleSearch(event) {
        event.preventDefault();
        props.requestSearchCatalogue(searchKeywords, searchByGenre);
    }

    const handleSearchInput = event => {
        setSearchKeywords(event.target.value);
    };

    return (
        <Paper style={searchMoviesInputStyle}>
            <form style={{ display: "flex" }} onSubmit={handleSearch}>
                {searchByGenre ? (
                    <MovieSelect
                        displayLabel
                        onChange={handleSearchInput}
                        value={searchKeywords}
                        placeholder="Search for movies..."
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

function mapDispatchToProps(dispatch) {
    return {
        requestSearchCatalogue: (searchKeywords, searchByGenre) =>
            dispatch(requestSearchCatalogue(searchKeywords, searchByGenre))
    };
}

SearchMoviesInput.propTypes = {
    requestSearchCatalogue: PropTypes.func
};

SearchMoviesInput.defaultProps = {
    requestSearchCatalogue: () => {}
};

export default connect(
    null,
    mapDispatchToProps
)(SearchMoviesInput);
