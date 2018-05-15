import axios from 'axios';
import {editTrip} from './trips-reducer';

import { EDIT_TRIP } from './trips-reducer';

const LOADING = 'LOADING';
const ERR_MSG = 'ERR_MSG';
const GET_DESTINATIONS = 'GET_DESTINATIONS';
const GET_ONE_DESTINATION = 'GET_ONE_DESTINATION';
const ADD_DESTINATION = 'ADD_DESTINATION';
export const EDIT_DESTINATION = 'EDIT_DESTINATION';
const DELETE_DESTINATION = 'DELETE_DESTINATION';

const destinationsURL = "/api/destinations/";

const initialState = {
    data: [],
    currentDestination: {},
    loading: true,
    errMsg: ""
}


/////////////////////
// Action Creators //
/////////////////////
export const getDestinations = () => {
    return dispatch => {
        axios.get(destinationsURL)
            .then(response => {
                dispatch({
                    type: GET_DESTINATIONS,
                    data: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `GET: ${err}`
                })
            })
    }
}

export const getOneDestination = (id) => {
    return dispatch => {
        axios.get(destinationsURL + id)
            .then(response => {
                dispatch({
                    type: GET_ONE_DESTINATION,
                    data: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `GET ONE: ${err}`
                })
            })
    }
}

export const addDestination = (newDestination, tripID) => {
    return dispatch => {
        axios.post(destinationsURL, newDestination)
            .then(response => {
                dispatch({
                    type: ADD_DESTINATION,
                    newDestination: response.data
                })
                const destID = response.data._id;
                return destID;
            })
            .then(destID => {
                let editedTrip = { destinations: destID };
                axios.post(`/api/trips/${tripID}/add-destination`, editedTrip)
                    .then(response => {
                        dispatch({
                            type: EDIT_TRIP,
                            editedTrip: response.data,
                            tripID
                        })
                    })
            })
            .then(response => {
                editTrip(tripId, {})
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `POST: ${err}`
                })
            })
    }
}

export const deleteDestination = (id) => {
    return dispatch => {
        axios.delete(destinationsURL + id)
            .then(response => {
                dispatch({
                    type: DELETE_DESTINATION,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `DELETE: ${err}`
                })
            })
    }
}

export const editDestination = (editedDestination, id) => {
    return dispatch => {
        let url = destinationsURL + id;
        axios.put(url, editedDestination)
            .then(response => {
                dispatch({
                    type: EDIT_DESTINATION,
                    editedDestination: response.data,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `PUT: ${err}`
                })
            })
    }
}

/////////////
// Reducer //
/////////////
const destinationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERR_MSG:
            return {
                ...state,
                loading: false,
                errMsg: action.errMsg
            }
        case GET_DESTINATIONS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case GET_ONE_DESTINATION:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case ADD_DESTINATION:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newDestination],
                currentDestination: action.newDestination
            }
        case EDIT_DESTINATION:
            return {
                ...state,
                loading: false,
                data: state.data.map(destination => {
                    if (destination._id === action.id) {
                        return action.editedDestination;
                    } else return destination;
                })
            }
        case DELETE_DESTINATION:
            return {
                ...state,
                loading: false,
                data: state.data.filter(destination => destination._id !== action.id)
            }

        default:
            return state;
    }
}

export default destinationsReducer;