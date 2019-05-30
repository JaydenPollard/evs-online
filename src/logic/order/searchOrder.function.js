import * as firebase from "firebase/app";
import "firebase/database";

/**
 * This function searches the orders in the firebase database by date
 * It will return orders with order dates that fall between two millisecond numbers created from param
 * @param searchDate The day that will be searched
 * @returns searchResult - an array of objects containing all the results found
 */
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
