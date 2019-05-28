import * as firebase from "firebase/app";
import "firebase/auth";

function createUserWithEmailAndPassword(email, password) {
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
}

export default createUserWithEmailAndPassword;
