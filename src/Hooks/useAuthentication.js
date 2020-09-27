import { useState, useEffect } from 'react';

let auth = window.firebase.auth();
const provider = new window.firebase.auth.GoogleAuthProvider();

export function useAuthentication() {

    const [authenticated, setAuthenticated] = useState('loading');

    function login() {
        auth.signInWithPopup(provider);
    }

    function logout() {
        auth
        .signOut()
        .then(() => { })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setAuthenticated(user);
            } else {
                setAuthenticated();
            }
        }, err => {
            console.log(err);
        })
    }, []);

    return {
        login,
        loggedIn: authenticated,
        logout
    }
}