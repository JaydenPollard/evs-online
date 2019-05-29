import {
    REQUEST_ORDERS_RETRIEVAL_SUCCESS,
    REQUEST_ORDERS_RETRIEVAL_FAIL
} from "./order-retrieval-actions";

const initialState = {
    orders: {},
    isLoading: true,
    errorMessage: ""
};

function orderRetrievalResult(state = initialState, action) {
    switch (action.type) {
        case REQUEST_ORDERS_RETRIEVAL_SUCCESS:
            return Object.assign({}, state, {
                orders: action.orders,
                isLoading: false
            });
        case REQUEST_ORDERS_RETRIEVAL_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}

export default orderRetrievalResult;
