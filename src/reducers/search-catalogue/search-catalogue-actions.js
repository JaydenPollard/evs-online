import searchMovies from "../../logic/movie/searchMovies.function";

export const REQUEST_SEARCH_CATALOGUE_FAIL =
    "@@catalogue/REQUEST_SEARCH_CATALOGUE_FAIL";
export const REQUEST_SEARCH_CATALOGUE_SUCCESS =
    "@@catalogue/REQUEST_SEARCH_CATALOGUE_SUCCESS";

/**
 * Performs the search and gets dispatch a success or failure depending on the response
 * @param searchKeywords The search keywords
 * @param searchByGenre The boolean on searching by genre
 * @returns {Function} dispatches an action to Redux
 */
export function requestSearchCatalogue(searchKeywords, searchByGenre) {
    return dispatch => {
        searchMovies(searchKeywords, searchByGenre)
            .then(results => {
                dispatch(searchSearchCatalogueSuccess(results));
            })
            .catch(errorMessage => {
                dispatch(searchSearchCatalogueFail(errorMessage));
            });
    };
}

/**
 * Return a success Redux action object
 * @param searchResults the search results
 * @returns {{type: string, searchResults: *}} Redux Action object
 */
export function searchSearchCatalogueSuccess(searchResults) {
    return {
        type: REQUEST_SEARCH_CATALOGUE_SUCCESS,
        searchResults
    };
}

/**
 * Return a failure Redux action object
 * @param errorMessage the error message
 * @returns {{errorMessage: *, type: string}} Redux Action object
 */
export function searchSearchCatalogueFail(errorMessage) {
    return {
        type: REQUEST_SEARCH_CATALOGUE_FAIL,
        errorMessage
    };
}
