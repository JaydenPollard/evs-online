import * as React from "react";
import { InputBase, Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { requestSearchCatalogue } from "../../../reducers/search-catalogue/search-catalogue-actions";

const searchMoviesInputStyle = {
    display: "flex",
    width: "40%",
    margin: "auto",
    marginBottom: "16px",
    padding: "8px"
};

const SearchMoviesInput = props => {
    const [searchKeywords, setSearchKeywords] = React.useState("");

    function handleSearch() {
        if (searchKeywords) {
            props.requestSearchCatalogue(searchKeywords);
        }
    }

    const handleSearchInput = event => {
        setSearchKeywords(event.target.value);
    };

    return (
        <Paper style={searchMoviesInputStyle}>
            <InputBase
                onChange={handleSearchInput}
                value={searchKeywords}
                placeholder="Search for movies..."
                fullWidth={true}
            />
            <Button onClick={handleSearch}>Search</Button>
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
