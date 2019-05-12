import * as React from "react";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { requestSearchCatalogue } from "../../../reducers/search-catalogue/search-catalogue-actions";

const SearchMoviesLayout = props => {
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
        <React.Fragment>
            <InputBase
                onChange={handleSearchInput}
                value={searchKeywords}
                placeholder="Search..."
            />
            <div>Search Movies Layout</div>
        </React.Fragment>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        requestSearchResults: searchKeywords =>
            dispatch(requestSearchCatalogue(searchKeywords))
    };
}

SearchMoviesLayout.propTypes = {
    requestSearchCatalogue: PropTypes.func
};

SearchMoviesLayout.defaultProps = {
    requestSearchCatalogue: () => {}
};

export default connect(
    null,
    mapDispatchToProps
)(SearchMoviesLayout);
