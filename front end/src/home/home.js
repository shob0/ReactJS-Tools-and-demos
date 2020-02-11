import React from 'react';
import auth0Client from '../Auth';
import LoginPage from '../LoginPage/loginPage';
import Questions from '../questions/questions';

function Home(props) {
    return <div>
        {
            !auth0Client.isAuthenticated() && <LoginPage />
        }
        {
            auth0Client.isAuthenticated() && <Questions />
        }

    </div>;
}

export default Home;