import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

/**
 * Creates a user in Firebase Auth with email and password
 * @param email A string of the current email, as fetched through the state
 * @param password A string of the current password, as fetched through the state
 * @returns Promise<UserCredential> which contains the User object (user.uid and user.email)
 * and logs the user in with Firebase Auth
 */
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

/**
 * Creates a user in Firebase Database.ref("Users/Customers") with authUserId key and
 * sets their information using the user object
 * @param authUserId A string of the current authUserId, as fetched through createUserWithAuth()
 * @param user An object of the current user details, as fetched through the state
 * @returns Promise<any> which signifies a success or failure, and should be handled
 * by anything that consumes this function
 */
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
