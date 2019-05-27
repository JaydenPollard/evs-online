import { combineReducers } from "redux";
import orderRetrievalResult from "./order-retrieval/order-retrieval-reducer";
import searchCatalogueResults from "./search-catalogue/search-catalogue-reducer";

export default combineReducers({
    searchCatalogueResults,
    orderRetrievalResult
});
