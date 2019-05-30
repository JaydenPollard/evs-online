/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase/app";
import App from "./App";

import store from "./reducers/store/store";
import Firebase, { FirebaseContext } from "./components/Firebase";


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </FirebaseContext.Provider>,
    document.getElementById("root")
);
