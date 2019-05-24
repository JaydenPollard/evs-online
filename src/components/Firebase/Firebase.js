import * as firebase from "firebase/app";

// Setup Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

// Initialise Firebase
const Firebase = () => {
    firebase.initializeApp(firebaseConfig);
};

// Export Firebase to be used in other components
export default Firebase;
