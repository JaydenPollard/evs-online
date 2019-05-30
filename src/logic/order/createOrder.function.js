import * as firebase from "firebase/app";
import "firebase/database";

/**
 * Creates a new order child in firebase with a unique id
 * Then it sets the properties of that new child to the order object param
 * @param order An object containing all the properties of a typical order
 * @returns boolean whether order was created successfully or not
 */
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
