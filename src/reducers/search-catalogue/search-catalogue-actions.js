export const REQUEST_SEARCH_CATALOGUE = "@@catalogue/REQUEST_SEARCH_CATALOGUE";
export const REQUEST_SEARCH_CATALOGUE_FAIL =
    "@@catalogue/REQUEST_SEARCH_CATALOGUE_FAIL";
export const REQUEST_SEARCH_CATALOGUE_SUCCESS =
    "@@catalogue/REQUEST_SEARCH_CATALOGUE_SUCCESS";

export function requestSearchCatalogue(searchKeywords) {
    return dispatch => {
        // Do search request to firebase here
    };
}

export function searchSearchCatalogueSuccess(searchResults) {
    return {
        type: REQUEST_SEARCH_CATALOGUE_SUCCESS,
        searchResults
    };
}

export function searchSearchCatalogueFail(errorMessage) {
    return {
        type: REQUEST_SEARCH_CATALOGUE_FAIL,
        errorMessage
    };
}
