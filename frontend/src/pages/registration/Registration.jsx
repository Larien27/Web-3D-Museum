import { useState } from 'react';
import './Registration.scss';

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        console.log('Before Prevent default');
        e.preventDefault();
        console.log('After Prevent default');

        alert('Submitted');
    }

    return(
        <div id='registration'>
            <h1>Registration</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label for='username'>Username</label>
                <input type='text' id='username' name='username' value={username} onChange={setUsername} />

                <label for='email'>Email</label>
                <input type='email' id='email' name='email' value={email} onChange={setEmail} />

                <label for='password'>Password</label>
                <input type='password' id='password' name='password' value={password} onChange={setPassword} />

                <button type="submit" onClick={(e) => handleSubmit(e)}>Register</button>
            </form>
        </div>
    );
}

export default Registration;