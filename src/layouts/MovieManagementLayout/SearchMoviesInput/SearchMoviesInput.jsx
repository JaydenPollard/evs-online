import * as React from "react";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { requestSearchCatalogue } from "../../../reducers/search-catalogue/search-catalogue-actions";

const searchMoviesInputStyle = {
    width: "40%",
    margin: "auto",
    marginBottom: "16px",
    padding: "4px 16px"
};

const SearchMoviesInput = props => {
    const [searchKeywords, setSearchKeywords] = React.useState("");

    function handleSearch(event) {
        event.preventDefault();
        if (searchKeywords) {
            props.requestSearchCatalogue(searchKeywords);
        }
    }

    const handleSearchInput = event => {
        setSearchKeywords(event.target.value);
    };

    return (
        <Paper style={searchMoviesInputStyle}>
            <form style={{ display: "flex" }} onSubmit={handleSearch}>
                <InputBase
                    required
                    onChange={handleSearchInput}
                    value={searchKeywords}
                    placeholder="Search for movies..."
                    fullWidth
                />
                <IconButton type="submit">
                    <Search />
                </IconButton>
            </form>
        </Paper>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        requestSearchResults: searchKeywords =>
            dispatch(requestSearchCatalogue(searchKeywords))
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
