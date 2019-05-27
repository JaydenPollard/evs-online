import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

//firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

//init firebase
const Firebase = () => {
    firebase.initializeApp(firebaseConfig);

    firebase.auth = firebase.auth();
    firebase.database = firebase.database();
    firebase.storage = firebase.storage();
};

//import this file to use firebase in your component
export default Firebase;
