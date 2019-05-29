import {
    REQUEST_SEARCH_CATALOGUE_SUCCESS,
    REQUEST_SEARCH_CATALOGUE_FAIL
} from "./search-catalogue-actions";

// Declare the initial state for search reducer
const initialState = {
    searchResults: [],
    isLoading: true,
    errorMessage: ""
};

/**
 * Receives the action objects and performs action it is expecting from it
 * @param state The current state of the reducer, use the initialState if it's empty
 * @param action The action that is to be performed
 * @returns The state after performing the action
 */
function searchCatalogueResults(state = initialState, action) {
    switch (action.type) {
        case REQUEST_SEARCH_CATALOGUE_SUCCESS:
            // Assign the state with the search results
            return Object.assign({}, state, {
                searchResults: action.searchResults,
                isLoading: false
            });
        case REQUEST_SEARCH_CATALOGUE_FAIL:
            // Assign the state with an error message
            return Object.assign({}, state, {
                isLoading: false,
                errorMessage: action.errorMessage
            });
        default:
            // Return current state if no matching actions were found
            return state;
    }
}

export default searchCatalogueResults;
