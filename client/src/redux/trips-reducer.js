import axios from 'axios';

let tripAxios = axios.create();

tripAxios.interceptors.request.use((config)=>{  
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const LOADING = 'LOADING';
const ERR_MSG = 'ERR_MSG';
const GET_TRIPS = 'GET_TRIPS';
const GET_ONE_TRIP = 'GET_ONE_TRIP';
const ADD_TRIP = 'ADD_TRIP';
export const EDIT_TRIP = 'EDIT_TRIP';
const DELETE_TRIP = 'DELETE_TRIP';
const LOGOUT = 'LOGOUT';

const tripsURL = "/api/trips/";

const initialState = {
    data: [],
    loading: true,
    errMsg: "",
    newestTrip: {},
    newestLoading: true
}


/////////////////////
// Action Creators //
/////////////////////
export const getTrips = () => {
    return dispatch => {
        tripAxios.get(tripsURL)
            .then(response => {
                dispatch({
                    type: GET_TRIPS,
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

export const getOneTrip = (id) => {
    return dispatch => {
        tripAxios.get(tripsURL + id)
            .then(response => {
                dispatch({
                    type: GET_ONE_TRIP,
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

export const addTrip = (newTrip) => {
    return dispatch => {
        tripAxios.post(tripsURL, newTrip)
            .then(response => {
                dispatch({
                    type: ADD_TRIP,
                    newTrip: response.data,
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `POST: ${err}`
                })
            })
    }
}

export const deleteTrip = (id) => {
    return dispatch => {
        tripAxios.delete(tripsURL + id)
            .then(response => {
                dispatch({
                    type: DELETE_TRIP,
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

export const editTrip = (editedTrip, id) => {
    return dispatch => {
        let url = tripsURL + id;
        tripAxios.put(url, editedTrip)
            .then(response => {
                dispatch({
                    type: EDIT_TRIP,
                    editedTrip: response.data,
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
const tripsReducer = (state = initialState, action) => {
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
        case GET_TRIPS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case GET_ONE_TRIP:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case ADD_TRIP:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newTrip],
                newestTrip: action.newTrip,
                newestLoading: false
            }
        case EDIT_TRIP:
            return {
                ...state,
                loading: false,
                data: state.data.map(trip => {
                    if (trip._id === action.id) {
                        return action.editedTrip;
                    } else return trip;
                })
            }
        case DELETE_TRIP:
            return {
                ...state,
                loading: false,
                data: state.data.filter(trip => trip._id !== action.id)
            }
        case LOGOUT:  
            return {
                ...initialState,
                loading: false
            }
        default:
            return state;
    }
}

export default tripsReducer;