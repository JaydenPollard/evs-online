import * as firebase from "firebase/app";
import "firebase/database";

export const disableCustomer = async user => {
    const customerRef = firebase.database.ref(`Users/Customers/${user.userId}`);
    const isActive = customerRef.child("IsActive");
    // Try to update user attribute, return true if successful, false if not
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
