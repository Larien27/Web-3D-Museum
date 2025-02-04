import './Login.scss';

function Login() {

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
        } catch (error) {
            setWireframeOverride('An error occurred. Please try again later.');
        }
    }

    return(
        <div id='login'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label for='username'>Username</label>
                <input type='text' id='username' />

                <label for='password'>Password</label>
                <input type='password' id='password' />

                <input type='submit' value='Login' />
            </form>
        </div>
    );
}

export default Login;