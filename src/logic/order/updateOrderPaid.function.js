import * as firebase from "firebase/app";
import "firebase/database";

/**
 * Function updates the order paid property inside an order
 * @param orderId The order id of the order being updated
 * @returns boolean whether update was done correctly
 */
async function updateOrderPaid(orderId) {
    const orderRef = firebase.database.ref("Order");
    const updateQuery = orderRef.child(orderId).child("OrderPaid");
    return updateQuery
        .set(true)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            return false;
        });
}

export default updateOrderPaid;
