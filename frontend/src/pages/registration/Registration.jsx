import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.scss';

function Registration() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users/register', formData);

            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Registration successful!'});
                navigate('/login');
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Registration failed' });
        }
    }

    return(
        <div id='registration'>
            <h1>Sign Up</h1>
            {message && <p className={message.type}>{message.text}</p>}
            <form onSubmit={handleSubmit}>
                <label for='username'>Username</label>
                <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} />

                <label for='email'>Email</label>
                <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} />

                <label for='password'>Password</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;