import * as firebase from "firebase/app";
import "firebase/database";

// The following function performs these actions:
// 1. Get reference to it's appropriate instance in firebase table by using user ID
// 2. Try to set "IsActive" field for that user to false, and returns true if successful

export const disableCustomer = async user => {
    const customerRef = firebase.database.ref(`Users/Customers/${user.userId}`);
    const isActive = customerRef.child("IsActive");
    return isActive
        .set(false)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            return false;
        });
};

export const disableStaff = async user => {
    const staffRef = firebase.database.ref(`Users/Staffs/${user.userId}`);
    const isActive = staffRef.child("IsActive");
    return isActive
        .set(false)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            return false;
        });
};
