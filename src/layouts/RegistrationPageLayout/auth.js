import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const createUserWithAuth = (email, password) => {
    const promise = new Promise((resolve, reject) => {
        firebase.auth
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject({ errorCode: error.code, errorMessage: error.message });
            });
    });
    return promise;
};

export const createUserInDatabase = (authUser, userData) => {
    const customersRef = firebase.database.ref("Users/Customers");
    const customerId = authUser.user.uid;
    const newCustomer = customersRef.child(customerId);
    const promise = new Promise((resolve, reject) => {
        newCustomer
            .set({
                userData
            })
            .catch(err => {
                alert("Error writing to database! User UID: " + err);
                reject(err);
            });
        resolve("success");
    });
    return promise;
};
