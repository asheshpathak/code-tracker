import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, isAuthenticated } = React.useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
        try {
            login({ email, password });
        } catch (err) {
            setError('An error occurred during login');
            console.error(err);
        }
    };
    if (isAuthenticated) {
        window.location.href = '/dashboard'; // Redirect to dashboard if already authenticated
        return null;
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96"> */}
            <form className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Login
                </button>
                <button type="button" onClick={() => window.location.href = '/signup'} className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition mt-2">
                    Don't have an account? Sign Up
                </button>
            </form>
        </div>
    );
}