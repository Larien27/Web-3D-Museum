import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './Login.scss';

function Login() {
    const { login, user } = useContext(AuthContext);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/exhibition-list');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users/login', formData);

            if (response.status === 200) {
                showToast('success', 'Login successful!');
                const token = response.data.token;
                login(token);
                navigate('/exhibition-list');
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Login failed');
        }
    }

    return(
        <div id='login'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label for='email'>Email</label>
                <input type='text' id='email' name='email' value={formData.email} onChange={handleChange} />

                <label for='password'>Password</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;