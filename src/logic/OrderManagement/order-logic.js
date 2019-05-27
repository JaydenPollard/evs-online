import * as firebase from "firebase/app";
import "firebase/database";

export function getSingleOrder(orderId) {
    return firebase.database
        .ref()
        .child("Order")
        .child(orderId)
        .once("value");
}

export function getSingleMovie(movieId) {
    return firebase.database
        .ref()
        .child("Movie")
        .child(movieId)
        .once("value");
}

export function getAllOrders() {
    return firebase.database
        .ref()
        .child("Order")
        .once("value");
}

export function getAllOrdersForUser(userId) {
    return firebase.database
        .ref()
        .child("Order")
        .orderByChild("CustomerID")
        .equalTo(userId)
        .once("value");
}
