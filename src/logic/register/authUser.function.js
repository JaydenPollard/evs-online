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

export const createUserInDatabase = (authUserId, user) => {
    const customersRef = firebase.database.ref("Users/Customers");
    const userRef = customersRef.child(authUserId);
    const promise = new Promise((resolve, reject) => {
        userRef
            .set({
                Name: user.name,
                Address: user.address,
                Email: user.email,
                MemberType: "Standard",
                DoB: user.dob,
                JoinedDate: setJoinedDate(),
                Password: user.password,
                PhoneNum: user.phoneNum,
                IsActive: true
            })
            .catch(err => {
                reject(err);
            });
        resolve("success");
    });
    return promise;
};

export const setJoinedDate = () => {
    const placeHolderDate = new Date();
    const formattedDate = `${placeHolderDate.getFullYear()}-${`0${placeHolderDate.getMonth() +
        1}`.slice(-2)}-${`0${placeHolderDate.getDate()}`.slice(-2)}`;
    return formattedDate;
};
