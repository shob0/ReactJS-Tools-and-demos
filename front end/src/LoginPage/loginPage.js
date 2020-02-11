import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import auth0Client from '../Auth';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            LoginError: null
        }
    }

    signInwWithAuth = () => {
        auth0Client.signIn();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.username === '' || this.state.password === '') {
            this.setState({ LoginError: `Can't Login. Empty Username and Password` });
            return;
        }
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        auth0Client.authenticate(user);
        this.props.history.replace('/');
    }

    handleUsernameChange = (event) => {
        console.log(event.target.value);
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        console.log(event.target.value);
        this.setState({ password: event.target.value });
    }

    validateEmail = (value) => {
        let error;
        if (value === '') {
            error = 'Surely you have a name';
        } else if (value === 'admin') {
            error = 'Nice Try';
        }
        this.setState({ LoginError: `` });
        return error;
    }

    validatePassword = (value) => {
        let error;
        if (value === '') {
            error = 'Password cannot be emty';
        }
        this.setState({ LoginError: `` });
        return error;
    }

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <div>
                        <Formik initialValues={this.state} enableReinitialize>
                            {({ errors, touched }) => (
                                <Form >
                                    <div>
                                        <h3 className="text-center">Login</h3>
                                    </div>
                                    <div className="mt-5">
                                        <Field type="text" name="username" validate={this.validateEmail} placeholder="Username" style={{ width: "250px" }} onChange={this.handleUsernameChange} />
                                        <div className="invalid-feedback" style={{ display: 'block' }}><ErrorMessage name="username" /></div>
                                    </div>
                                    <div className="mt-3">
                                        <Field type="password" name="password" validate={this.validatePassword} placeholder="Password" style={{ width: "250px" }} onChange={this.handlePasswordChange} />
                                        <div className="invalid-feedback" style={{ display: 'block' }}><ErrorMessage name="password" /></div>
                                    </div>
                                    <div className="mt-3">
                                        <button className='btn btn-success mr-3' style={{ width: "120px" }} onClick={this.signInwWithAuth}>With Auto0</button>
                                        <button className='btn btn-success ml-3' style={{ width: "100px" }} onClick={this.handleSubmit}>Login</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div>
                    <div className=" invalid-feedback d-block">
                        <p className="text-center">
                            {this.state.LoginError}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage);
