import axios from 'axios';

const LOADING = 'LOADING';
const ERR_MSG = 'ERR_MSG';
const GET_TRANSPORTATION = 'GET_TRANSPORTATION';
const GET_ONE_TRANSPORTATION = 'GET_ONE_TRANSPORTATION';
const ADD_TRANSPORTATION = 'ADD_TRANSPORTATION';
const EDIT_TRANSPORTATION = 'EDIT_TRANSPORTATION';
const DELETE_TRANSPORTATION = 'DELETE_TRANSPORTATION';

const transportationURL = "/api/transportation";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}


/////////////////////
// Action Creators //
/////////////////////
export const getTransportation = () => {
    return dispatch => {
        axios.get(transportationURL)
            .then(response => {
                dispatch({
                    type: GET_TRANSPORTATION,
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

export const getOneTransportation = (id) => {
    return dispatch => {
        axios.get(transportationURL + id)
            .then(response => {
                dispatch({
                    type: GET_ONE_TRANSPORTATION,
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

export const addTransportation = (newTransportation) => {
    return dispatch => {
        axios.post(transportationURL, newTransportation)
            .then(response => {
                dispatch({
                    type: 'ADD_TRANSPORTATION',
                    newTransportation: response.data
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

export const deleteTransportation = (id) => {
    return dispatch => {
        axios.delete(transportationURL + id)
            .then(response => {
                dispatch({
                    type: 'DELETE_TRANSPORTATION',
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

export const editTransportation = (editedTransportation, id) => {
    return dispatch => {
        let url = transportationURL + id;
        axios.put(url, editedTransportation)
            .then(response => {
                dispatch({
                    type: 'EDIT_TRANSPORTATION',
                    editedTransportation: response.data,
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
const transportationReducer = (state = initialState, action) => {
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
        case GET_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case GET_ONE_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case ADD_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newTransportation]
            }
        case EDIT_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: state.data.map(transportation => {
                    if (transportation._id === action.id) {
                        return action.editedTransportation;
                    } else return transportation;
                })
            }
        case DELETE_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: state.data.filter(transportation => transportation._id !== action.id)
            }

        default:
            return state;
    }
}

export default transportationReducer;