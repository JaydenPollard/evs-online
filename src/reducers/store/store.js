import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer";
// Enable the use of Redux Dev Tools extension
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Create our store to save data related to the reducers and enable middleware
const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;
