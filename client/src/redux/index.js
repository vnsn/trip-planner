import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import trips from "./trips-reducer";
import destinations from "./destinations-reducer";

const store = createStore(combineReducers({trips, destinations}), 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunk));


store.subscribe(() => {
    console.log(store.getState());
})

export default store;
