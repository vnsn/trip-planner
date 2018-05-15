import axios from "axios";

// const profileAxios = axios.create();
// profileAxios.interceptors.request.use(config => {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// })

const AUTHENTICATE = 'AUTHENTICATE';
const LOGOUT = 'LOGOUT';
const SIGNUP_ERROR = 'SIGNUP_ERROR';
const STOP_LOADING = 'STOP_LOADING';

const signupURL = "/auth/signup/";
const loginURL = "/auth/login/";

const initialState = {
    loading: true,
    username: "",
    isAdmin: false,
    isAuthenticated: false,
    authErrCode: {
        signup: "",
        login: ""
    }
}


/////////////////////
// Action Creators //
/////////////////////
function authenticate(user) {
    return {
        type: AUTHENTICATE,
        user
    }
}

export const signup = (userInfo) => {
    // make post request with user info, and store the token and user data that comes back
    return dispatch => {
        axios.post(signupURL, userInfo)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));
            })
    }
}

export const login = (credentials) => {
    return dispatch => {
        axios.post(loginURL, credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));
            })
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: LOGOUT
    }
}


/////////////
// Reducer //
/////////////
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }

        case SIGNUP_ERROR:
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false
            };
        case AUTHENTICATE:
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode: {
                    signup: "",
                    signin: ""
                }, 
                loading: false
            };  
        case LOGOUT:
            return {
                ...initialState,
                loading: false
            };
        default:
            return state;
    }
}

export default authReducer;