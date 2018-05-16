import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, login, eraseError } from '../../redux/auth-reducer';
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                username: "",
                password: ""
            },
            signup: props.signup,
            noUsername: false,
            noPassword: false
        }
        this.state = this.initialState;
    }

    requestAuth = (e) => {
        if (this.state.signup) {
            this.props.signup(this.state.inputs);
        } else {
            this.props.login(this.state.inputs);
        }
        this.setState(this.initialState);

    }
    changeToSignUp = (e) => {
        this.setState(prevState => ({ signup: !prevState.signup }))
    }
    handleChange = (e) => {
        const {name, value} = e.target
        this.props.eraseError();
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state.inputs;

        if (!username && !password) return this.setState({ noUsername: true, noPassword: false })
        if (username && !password) return this.setState({ noUsername: false, noPassword: true })
        if (!username && password) return this.setState({ noUsername: true, noPassword: false })

        this.requestAuth();
    }

    render() {
        let errMsg = "";
        let authErrCode;

        if (this.state.signup) {
            authErrCode = this.props.authErrCode.signup;
        } else {
            authErrCode = this.props.authErrCode.login;
        }

        if (authErrCode < 500 && authErrCode > 399) {
            if (this.state.signup) {
                errMsg = "Username already taken";
            } else {
                errMsg = "Invalid username or password!";
            }
        } else if (authErrCode > 499) {
            errMsg = "Server error!";
        }

        const { username, password } = this.state.inputs;
        return (
            <div className='login'>
                {!this.state.signup ? <h2>Log-in to your account</h2> : null}
                {this.state.signup ? <h2>Sign Up</h2> : null}
                {this.state.noUsername ? <p className='red'>Please enter a username</p> : null}
                {this.state.noPassword ? <p className='red'>Please enter a password</p> : null}
                <form className='loginForm' onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} name='username' value={username} type="text" placeholder='E-mail Address' />
                    <input onChange={this.handleChange} name='password' value={password} type="text" placeholder='Password' />
                    {!this.state.signup ? <button>Login</button> : null}
                    {this.state.signup ? <button>Sign Up</button> : null}
                </form>

                {errMsg && <p>{errMsg}</p>}

                <div className='signup'>
                    {!this.state.signup && <p>New to us?</p>}
                    {this.state.signup && <p>Already have an account?</p>}
                    {!this.state.signup && <Link to="/signup" onClick={this.changeToSignUp}>Sign Up</Link>}
                    {this.state.signup && <Link to="/" onClick={this.changeToSignUp}>Login</Link>}
                </div>
            </div>
        )
    }
}

export default connect(state => state.users, { signup, login, eraseError })(Login);