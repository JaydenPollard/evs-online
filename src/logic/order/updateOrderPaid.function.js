import * as firebase from "firebase/app";
import "firebase/database";

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
