import auth0 from 'auth0-js';
// import axios from 'axios';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: `dev-4sfcte3m.eu.auth0.com`,
            audience: `https://dev-4sfcte3m.eu.auth0.com/userinfo`,
            clientID: `mfaFKVlkjJtR9J7Apkycqz7I32mM1kWv`,
            redirectUri: `http://localhost:3000/callback`,
            responseType: `id_token`,
            scope: `openid profile`
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }


    async authenticate(user) {
        // const authenticationResult = (await axios.post('http://localhost:8012/authenticate', {
        //     user
        // })).data;
        localStorage.setItem('id_token', 'Temp')
        this.profile = { name: "Admin" };
        return true;
    }

    getProfile() {
        return this.profile ? this.profile : { name: "Admin" };
    }

    getIdToken() {
        return this.getIdToken;
    }

    isAuthenticated() {
        if (localStorage.getItem('id_token') === 'Temp') {
            return true;
        } else {
            return new Date().getTime() < this.expiresAt;
        }

    }

    signIn() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;
                //Store the token in local storage
                localStorage.setItem('id_token', this.idToken);
                //Set the thime that the id token will expire at
                this.expiresAt = authResult.idTokenPayload.exp * 1000;
                resolve();
            })
        });
    }

    signOut() {
        localStorage.removeItem('id_token');
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const auth0Client = new Auth();

export default auth0Client