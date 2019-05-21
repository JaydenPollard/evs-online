import { orderRef } from "../../components/Firebase";

export const REQUEST_ORDER_RETRIEVAL = "@@catalogue/REQUEST_ORDER_RETRIEVAL";
export const REQUEST_ORDER_RETRIEVAL_FAIL =
    "@@catalogue/REQUEST_ORDER_RETRIEVAL_FAIL";
export const REQUEST_ORDER_RETRIEVAL_SUCCESS =
    "@@catalogue/REQUEST_ORDER_RETRIEVAL_SUCCESS";

export function requestOrderRetrieval(orderId) {
    orderRef.on("value", snapshot => {
        return dispatch => {
            orderRetrievalSuccess(snapshot.val());
        };
    });
}

export function orderRetrievalSuccess(order) {
    return {
        type: REQUEST_ORDER_RETRIEVAL_SUCCESS,
        order
    };
}

export function orderRetrievalFail(errorMessage) {
    return {
        type: REQUEST_ORDER_RETRIEVAL_FAIL,
        errorMessage
    };
}
