import * as firebase from "firebase/app";
import "firebase/database";

async function updateOrderStatus(orderId, status) {
    console.log("hey");
    const orderRef = firebase.database.ref("Order");
    const updateQuery = orderRef.child(orderId).child("OrderStatus");
    return updateQuery
        .set(status)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            return false;
        });
}

export default updateOrderStatus;
