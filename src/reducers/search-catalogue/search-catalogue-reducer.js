import {
    REQUEST_SEARCH_CATALOGUE_SUCCESS,
    REQUEST_SEARCH_CATALOGUE_FAIL
} from "./search-catalogue-actions";

const initialState = {
    searchResults: [],
    isLoading: true,
    errorMessage: ""
};

function searchCatalogueResults(state = initialState, action) {
    switch (action.type) {
        case REQUEST_SEARCH_CATALOGUE_SUCCESS:
            return Object.assign({}, state, {
                searchResults: action.searchResults,
                isLoading: false
            });
        case REQUEST_SEARCH_CATALOGUE_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}

export default searchCatalogueResults;
