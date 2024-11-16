import './Login.scss';

function Login() {
    return(
        <div id='login'>
            <h1>Login</h1>
            <form>
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