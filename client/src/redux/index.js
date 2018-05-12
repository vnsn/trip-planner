import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import trips from "./trips-reducer";
import destinations from "./destinations-reducer";
import reservations from "./reservations-reducer";
import transportation from "./transportation-reducer";

const store = createStore(combineReducers({trips, destinations, reservations, transportation}), 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunk));


store.subscribe(() => {
    console.log(store.getState());
})

export default store;
