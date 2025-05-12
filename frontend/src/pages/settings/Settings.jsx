import axios from 'axios';
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './Settings.scss';

function Settings() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e, type) => {
        e.preventDefault();

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
            const response = await axios.post(endpoint, data, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            
            if (response.status === 200) {
                showToast('success', 'Update was successful!');
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
            showToast('error', error.response?.data?.message || 'Update failed');
        }
    }

    return(
        <div id='settings'>
            <h1>Settings</h1>
            
            <div>
                <h2>Change username:</h2>
                <form onSubmit={(e) => handleSubmit(e, 'username')}>
                    <label for='currentUsername'>Current username</label>
                    <input type='text' id='currentUsername' name='currentUsername' value={formData.currentUsername} onChange={handleChange} />

                    <label for='newUsername'>New username</label>
                    <input type='text' id='newUsername' name='newUsername' value={formData.newUsername} onChange={handleChange} />

                    <label for='passwordForUsername'>Password</label>
                    <input type='password' id='passwordForUsername' name='passwordForUsername' value={formData.passwordForUsername} onChange={handleChange} />

                    <button type='submit'>Apply</button>
                </form>
            </div>
            
            <div>
                <h2>Change email:</h2>
                <form onSubmit={(e) => handleSubmit(e, 'email')}>
                    <label for='currentEmail'>Current email</label>
                    <input type='email' id='currentEmail' name='currentEmail' value={formData.currentEmail} onChange={handleChange} />

                    <label for='newEmail'>New email</label>
                    <input type='email' id='newEmail' name='newEmail' value={formData.newEmail} onChange={handleChange} />

                    <label for='passwordForEmail'>Password</label>
                    <input type='password' id='passwordForEmail' name='passwordForEmail' value={formData.passwordForEmail} onChange={handleChange} />

                    <button type='submit'>Apply</button>
                </form>
            </div>

            <div>                       
                <h2>Change password:</h2>
                <form onSubmit={(e) => handleSubmit(e, 'password')}>
                    <label for='usernameForPassword'>Username</label>
                    <input type='text' id='usernameForPassword' name='usernameForPassword' value={formData.usernameForPassword} onChange={handleChange} />

                    <label for='currentPassword'>Current password</label>
                    <input type='password' id='currentPassword' name='currentPassword' value={formData.currentPassword} onChange={handleChange} />

                    <label for='newPassword'>New password</label>
                    <input type='password' id='newPassword' name='newPassword' value={formData.newPassword} onChange={handleChange} />

                    <button type='submit'>Apply</button>
                </form>
            </div> 
        </div>
    );
}

export default Settings;