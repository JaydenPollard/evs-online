import searchOrders from "../../logic/order/searchOrder.function";

export const REQUEST_ORDERS_RETRIEVAL = "@@catalogue/REQUEST_ORDER_RETRIEVAL";
export const REQUEST_ORDERS_RETRIEVAL_FAIL =
    "@@catalogue/REQUEST_ORDER_RETRIEVAL_FAIL";
export const REQUEST_ORDERS_RETRIEVAL_SUCCESS =
    "@@catalogue/REQUEST_ORDERS_RETRIEVAL_SUCCESS";

export function requestOrdersRetrieval(searchDate) {
    return dispatch => {
        searchOrders(searchDate)
            .then(orderResults => {
                dispatch(ordersRetrievalSuccess(orderResults));
            })
            .catch(errorMessage => {
                dispatch(ordersRetrievalFail(errorMessage));
            });
    };
}

export function ordersRetrievalSuccess(orders) {
    return {
        type: REQUEST_ORDERS_RETRIEVAL_SUCCESS,
        orders
    };
}

export function ordersRetrievalFail(errorMessage) {
    return {
        type: REQUEST_ORDERS_RETRIEVAL_FAIL,
        errorMessage
    };
}
