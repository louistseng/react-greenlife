import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
export const authContext = createContext({});

const AuthProvider = ({ children }) => {
    const cookies = new Cookies();

    const [auth, setAuth] = useState({ loading: true, data: null });
    // we will use loading later


    const setAuthData = (data) => {
        setAuth({ userGuid: data });
    };
    // a function that will help us to add the user data in the auth;

    useEffect(() => {
        setAuth({ userGuid: JSON.parse(cookies.get('userGuid')) });
    }, []);

    return (
        <authContext.Provider value={{ auth, setAuthData }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;