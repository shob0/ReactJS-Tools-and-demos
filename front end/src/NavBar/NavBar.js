import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    }

    return (
        <nav className="navbar navbar-dark bg-primary fixed-top" style={{ justifyContent: 'none' }}>
            <div>
                <Link className="navbar-brand" to="/">
                    Q&App
            </Link>
                <Link className="navbar-brand" to="/tools">
                    Tools
            </Link>

            </div>
            {
                auth0Client.isAuthenticated() &&
                <div>
                    <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                    <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
                </div>
            }
        </nav>
    )
}

export default withRouter(NavBar);