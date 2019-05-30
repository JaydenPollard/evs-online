import * as firebase from "firebase/app";
import "firebase/database";

/**
 * Update the status inside an order in the firebase database
 * This can be used for admins to set the status, or for users to cancel their order, by setting status to cancelled
 * @param orderId The order id of the order being updated
 * @param status The new status message to add to the order
 * @returns boolean whether the update status completed correctly
 */
async function updateOrderStatus(orderId, status) {
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
