import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

function Registration() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axios.post('/api/users/register', formData);

            if (response.status === 201) {
                showToast('success', 'Registration successful!');
                navigate('/login');
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Registration failed');
        }
    }

    return(
        <div id='registration'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label for='username'>Username</label>
                <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} />

                <label for='email'>Email</label>
                <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} />

                <label for='password'>Password</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Registration;