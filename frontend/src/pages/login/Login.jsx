import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
    const [formData, setFormData] = useState({
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
            const response = await axios.post('/api/users/login', formData);

            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Login successful!'});
                navigate('/exhibition-list');
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Login failed' });
        }
    }

    return(
        <div id='login'>
            <h1>Login</h1>
            {message && <p className={message.type}>{message.text}</p>}
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