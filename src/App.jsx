import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import HomePage from "./layouts/HomePageLayout/HomePageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import firebase from "firebase";
import UserManagement from "./layouts/UserManagementLayout/UserManagementLayout";
//initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTT8GvpjD5AMOMkAQZlP8Pj8P57n70jJg",
  authDomain: "tba-evs.firebaseapp.com",
  databaseURL: "https://tba-evs.firebaseio.com",
  projectId: "tba-evs",
  storageBucket: "tba-evs.appspot.com",
  messagingSenderId: "747412141354",
  appId: "1:747412141354:web:59d4cf6f365fc635"
};
firebase.initializeApp(firebaseConfig);

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/user-management" exact component ={UserManagement} /> 
            <Route component={HomePage} />
        </Switch>
    </BrowserRouter>
);
export default App;
