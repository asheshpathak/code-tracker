import React, { createContext, useEffect } from "react";
import { apiClient } from "../utils/apis";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    token?: string; // Optional token for authenticated requests
}

export const AuthContext = createContext({
    isAuthenticated: false,
    user: null as User | null,
    login: (user: any) => { },
    logout: () => { },
    register: (user: any) => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        // Check if user is authenticated on initial load
        const token = localStorage.getItem("authToken");
        if (token) {
            apiClient.verifyToken(token)
                .then((response: any) => {
                    if (response.success) {
                        console.log('User is authenticated:', response.data);
                        setUser(response.data);
                        setIsAuthenticated(true);
                    } else {
                        console.error('Token verification failed:', response.message);
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred during token verification:', error);
                    setUser(null);
                    setIsAuthenticated(false);
                });
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    }, []);

    const login = (user: any) => {
        apiClient.login(user.email, user.password)
            .then((response: any) => {
                if (response.success) {
                    console.log('Login successful:', response.data);
                    setUser(response.data);
                    setIsAuthenticated(true);
                    localStorage.setItem("authToken", response.data.token); // Assuming response contains a token
                } else {
                    console.error('Login failed:', response.message);
                }
            })
            .catch((error) => {
                console.error('An error occurred during login:', error);
            });
    }

    const register = (user: any) => {
        apiClient.register(user.firstName, user.lastName, user.email, user.password)
            .then((response: any) => {
                if (response.success) {
                    console.log('Signup successful:', response);
                    setUser(response.data);
                    setIsAuthenticated(true);
                    localStorage.setItem("authToken", response.token); // Assuming response contains a token
                } else {
                    console.error('Signup failed:', response.message);
                }
            })
            .catch((error) => {
                console.error('An error occurred during signup:', error);
            });
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};