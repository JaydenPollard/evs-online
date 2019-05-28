import * as firebase from "firebase/app";
import "firebase/database";

async function searchOrders(searchDate) {
    const orderRef = firebase.database.ref("Order");
    const startDate = new Date(searchDate).getTime();
    const endDate = startDate + 86400000;
    let searchResult = [];
    const orderQuery = orderRef
        .orderByChild("OrderDate")
        .startAt(startDate)
        .endAt(endDate);

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
