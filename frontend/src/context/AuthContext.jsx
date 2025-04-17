import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ token, role: decoded.role });
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        setUser({ token, role: decoded.role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
