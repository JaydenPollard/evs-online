/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import * as firebase from "firebase/app";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import "firebase/auth"

const AppUI = props => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <BrowserRouter>
                <App  />
            </BrowserRouter>
        </FirebaseContext.Provider>
    );
};


    ReactDOM.render(<App />, document.getElementById("root"));

