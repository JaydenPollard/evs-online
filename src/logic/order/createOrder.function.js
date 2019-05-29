import * as firebase from "firebase/app";
import "firebase/database";

async function createOrder(order) {
    const orderRef = firebase.database.ref("Order");
    const newOrderID = await orderRef.push().getKey();
    order.OrderDate = new Date(order.OrderDate).getTime();
    return orderRef
        .child(newOrderID)
        .set(order)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            return false;
        });
}

export default createOrder;
