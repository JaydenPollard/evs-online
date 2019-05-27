import * as firebase from "firebase/app";
import Firebase from "../../components/Firebase";
import {
    getSingleOrder,
    getSingleMovie,
    getAllOrders,
    getAllOrdersForUser
} from "../../logic/OrderManagement/order-logic";

export const REQUEST_ORDER_RETRIEVAL = "@@catalogue/REQUEST_ORDER_RETRIEVAL";
export const REQUEST_ORDER_RETRIEVAL_FAIL =
    "@@catalogue/REQUEST_ORDER_RETRIEVAL_FAIL";
export const REQUEST_ORDER_RETRIEVAL_SUCCESS =
    "@@catalogue/REQUEST_ORDER_RETRIEVAL_SUCCESS";
export const REQUEST_ORDERS_RETRIEVAL_SUCCESS =
    "@@catalogue/REQUEST_ORDERS_RETRIEVAL_SUCCESS";

export function requestOrderRetrieval(orderId) {
    return dispatch => {
        getSingleOrder(orderId).then(function(snapshot) {
            dispatch(orderRetrievalSuccess(snapshot.val()));
        });
    };
}

export function requestAllOrdersRetrieval() {
    return dispatch => {
        getAllOrders().then(function(snapshot) {
            dispatch(ordersRetrievalSuccess(snapshot.val()));
        });
    };
}

export function requestUserOrdersRetrieval(userId) {
    return dispatch => {
        getAllOrdersForUser(userId).then(function(snapshot) {
            dispatch(ordersRetrievalSuccess(snapshot.val()));
        });
    };
}

export function ordersRetrievalSuccess(orders) {
    return {
        type: REQUEST_ORDERS_RETRIEVAL_SUCCESS,
        orders
    };
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
