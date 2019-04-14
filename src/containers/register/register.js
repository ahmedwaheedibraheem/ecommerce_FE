import React, { Component } from 'react';
import { register } from '../../API/userAPIs';

class Register extends Component {
    state = {
        userData: {
            username: '',
            password: '',
            email: ''
        },
        registerationStatus: null
    };
    //
    // onChangeHandler
    //
    onChangeHandler = (fieldName, fieldValue) => {
        this.setState({
            userData: {
                ...this.state.userData,
                [fieldName]: fieldValue
            }
        });
    };
    //
    // registerHandler
    //
    registerHandler = async () => {
        try {
            if (this.state.userData.username && this.state.userData.password && this.state.userData.email) {
                this.setState({
                    registerationStatus: 'registering'
                })
                const response = await register(this.state.userData);
                if (!response.username) {
                    alert('Registration failed! Please click "OK and try again!');
                    return this.setState({
                        registerationStatus: null
                    });
                };
                if (response.username) {
                    alert('You are now registered! Please click "OK" and login!');
                    this.props.history.push('/');
                }
            } else {
                alert('Missing information');
            };
        } catch (err) {
            console.log(err);
        };
    };
    //
    // render
    //
    render() {
        return (
            <>
                <h1>Register!</h1>
                <input type='text' name='username' placeholder='username'
                    onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                <input type='text' name='password' placeholder='password'
                    onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                <input type='email' name='email' placeholder='email'
                    onChange={(event) => this.onChangeHandler(event.target.name, event.target.value)} />
                <button onClick={this.registerHandler} >Register</button>
                {this.state.registerationStatus === 'registering' ? <h3>Registering ...</h3> : null}
            </>
        );
    };
};

export default Register;