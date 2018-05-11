import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                username: "",
                password: ""
            },
            signup: false,
            noUsername: false,
            noPassword: false
        }
        this.state = this.initialState;
    }

    requestAuth = (e) => {

    }
    changeToSignUp = (e) => {
        this.setState(prevState => ({ signup: !prevState.signup }))
    }
    handleChange = (e) => {
        e.persist()
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [e.target.name]: e.target.value
            }
        }))
    }
    handleSubmit = (e) => {
        const { username, password } = this.state.inputs;
        e.preventDefault();

        if (!username && !password) return this.setState({ noUsername: true, noPassword: false })
        if (username && !password) return this.setState({ noUsername: false, noPassword: true })
        if (!username && password) return this.setState({ noUsername: true, noPassword: false })
        
        // check if logging in or singing up
        // call redux function based on that
    }

    render() {
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
                <div className='signup'>
                    {!this.state.signup ? <p>New to us?</p> : null}
                    {this.state.signup ? <p>Already have an account?</p> : null}
                    {!this.state.signup ? <button onClick={this.changeToSignUp}>Sign Up</button> : null}
                    {this.state.signup ? <button onClick={this.changeToSignUp}>Login</button> : null}
                </div>
            </div>
        )
    }
}

export default connect(null, {})(Login);