import axios, { formToJSON } from 'axios';
import { useState } from 'react';

function Settings() {
    const [formData, setFormData] = useState({
        currentUsername: '',
        newUsername: '',
        passwordForUsername: '',
        currentEmail: '',
        newEmail: '',
        passwordForEmail: '',
        usernameForPassword: '',
        currentPassword: '',
        newPassword: '',
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        setMessage(null);

        let endpoint = '';
        let data = {};

        if (type === 'username') {
            endpoint = '/api/users/change-username';
            data = {
                currentUsername: formData.currentUsername,
                newUsername: formData.newUsername,
                password: formData.passwordForUsername,
            };
        } else if (type === 'email') {
            endpoint = '/api/users/change-email';
            data = {
                currentEmail: formData.currentEmail,
                newEmail: formData.newEmail,
                password: formData.passwordForEmail,
            };
        } else if (type === 'password') {
            endpoint = '/api/users/change-password';
            data = {
                username: formData.usernameForPassword,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            };
        }

        try {
            const response = await axios.post(endpoint, data);
            
            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Update was successful!' });
                setFormData({
                    currentUsername: '',
                    newUsername: '',
                    passwordForUsername: '',
                    currentEmail: '',
                    newEmail: '',
                    passwordForEmail: '',
                    usernameForPassword: '',
                    currentPassword: '',
                    newPassword: '',
                })
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
        }
    }

    return(
        <div id='settings'>
            <h1>Settings</h1>
            {message && <p className={message.type}>{message.text}</p>}
            
            <h2>Change username</h2>
            <form onSubmit={(e) => handleSubmit(e, 'username')}>
                <label for='currentUsername'>Current username:</label>
                <input type='text' id='currentUsername' name='currentUsername' value={formData.currentUsername} onChange={handleChange} />

                <label for='newUsername'>New username:</label>
                <input type='text' id='newUsername' name='newUsername' value={formData.newUsername} onChange={handleChange} />

                <label for='passwordForUsername'>Password:</label>
                <input type='password' id='passwordForUsername' name='passwordForUsername' value={formData.passwordForUsername} onChange={handleChange} />

                <button type='submit'>Apply</button>
            </form>
            
            <hr />

            <h2>Change email</h2>
            <form onSubmit={(e) => handleSubmit(e, 'email')}>
                <label for='currentEmail'>Current email:</label>
                <input type='email' id='currentEmail' name='currentEmail' value={formData.currentEmail} onChange={handleChange} />

                <label for='newEmail'>New email:</label>
                <input type='email' id='newEmail' name='newEmail' value={formData.newEmail} onChange={handleChange} />

                <label for='passwordForEmail'>Password:</label>
                <input type='password' id='passwordForEmail' name='passwordForEmail' value={formData.passwordForEmail} onChange={handleChange} />

                <button type='submit'>Apply</button>
            </form>
            
            <hr />
            
            <h2>Change password</h2>
            <form onSubmit={(e) => handleSubmit(e, 'password')}>
                <label for='usernameForPassword'>Username:</label>
                <input type='text' id='usernameForPassword' name='usernameForPassword' value={formData.usernameForPassword} onChange={handleChange} />

                <label for='currentPassword'>Current password:</label>
                <input type='password' id='currentPassword' name='currentPassword' value={formData.currentPassword} onChange={handleChange} />

                <label for='newPassword'>New password:</label>
                <input type='password' id='newPassword' name='newPassword' value={formData.newPassword} onChange={handleChange} />

                <button type='submit'>Apply</button>
            </form>
        </div>
    );
}

export default Settings;