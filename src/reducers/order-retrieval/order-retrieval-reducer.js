import {
    REQUEST_ORDER_RETRIEVAL_SUCCESS,
    REQUEST_ORDER_RETRIEVAL_FAIL
} from "./order-retrieval-actions";

const initialState = {
    order: {},
    isLoading: true,
    errorMessage: ""
};

function searchCatalogueResults(state = initialState, action) {
    switch (action.type) {
        case REQUEST_ORDER_RETRIEVAL_SUCCESS:
            return Object.assign({}, state, {
                order: action.order,
                isLoading: false
            });
        case REQUEST_ORDER_RETRIEVAL_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}

export default searchCatalogueResults;
