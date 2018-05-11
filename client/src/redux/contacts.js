import axios from 'axios';

const initialState = {
    data: [],
    loading: true,
    errMsg: "",
    currentContact: {},
    currentLoading: true,
    currentErrMsg: ""
};

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        case "GET_CONTACTS":
            return {
                ...state,
                data: action.contacts,
                loading: false
            }
        case "POST_CONTACT":
            return {
                ...state,
                data: [...state.data, action.contact],
                loading: false
            }
        case "GET_CONTACT":
            return {
                ...state,
                currentContact: action.contact,
                loading: false
            }
        case "EDIT_CONTACT":
            return {
                ...state,
                data: state.data.map(contact => action.id === contact.id ? action.contact : contact),
                loading: false
            }
        case "DELETE_CONTACT":
            return {
                ...state,
                data: state.data.filter(contact => action.id !== contact._id),
                loading: false
            }
        default:
            return state;
    }
}

export const getContacts = () => {
    return dispatch => {
        axios.get("/api/contacts")
            .then(response => {
                dispatch({
                    type: "GET_CONTACTS",
                    contacts: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: 'Sorry, contacts are not available.'
                })
            })
    }
}

export const postContact = (newContact) => {
    return dispatch => {
        axios.post("/api/contacts",newContact)
            .then(response => {
                dispatch({
                    type: "POST_CONTACT",
                    contact: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't post new contact right now."
                })
            })
    }
}

export const getContact = (id) => {
    return dispatch => {
        axios.get("/api/contacts/" + id)
            .then(response => {
                dispatch({
                    type: "GET_CONTACT",
                    contact: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't get contact right now."
                })
            })
    }
}

export const editContact = (id, newContact) => {
    return dispatch => {
        axios.put("/api/contacts/" + id, newContact)
            .then(response => {
                dispatch({
                    type: "EDIT_CONTACT",
                    contact: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't edit contact right now."
                })
            })
    }
}

export const deleteContact = (id) => {
    return dispatch => {
        axios.delete("/api/contacts/" + id)
            .then(response => {
                dispatch({
                    type: "DELETE_CONTACT",
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't delete contact right now."
                })
            })
    }
}

export default contactsReducer;