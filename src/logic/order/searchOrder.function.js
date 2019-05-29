import * as firebase from "firebase/app";
import "firebase/database";

async function searchOrders(searchDate) {
    const orderRef = firebase.database.ref("Order");
    const startDate = new Date(searchDate);
    const endDate = new Date(searchDate);
    endDate.setHours(23, 59, 59, 999);
    startDate.setHours(0, 0, 0, 0);
    let searchResult = [];
    const orderQuery = orderRef
        .orderByChild("OrderDate")
        .startAt(startDate.getTime())
        .endAt(endDate.getTime());

    await orderQuery.once("value", function(snapshot) {
        if (snapshot.val()) {
            searchResult = Object.keys(snapshot.val()).map(function(key) {
                const order = snapshot.val()[key];
                order.OrderDate = new Date(order.OrderDate);
                return [key, order];
            });
        }
    });
    return searchResult;
}

export default searchOrders;
