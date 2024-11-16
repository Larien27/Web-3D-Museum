import './Registration.scss';

function Registration() {
    return(
        <div id='registration'>
            <h1>Registration</h1>
            <form>
                <label for='username'>Username</label>
                <input type='text' id='username' />

                <label for='email'>Email</label>
                <input type='email' id='email' />

                <label for='password'>Password</label>
                <input type='password' id='password' />

                <input type='submit' value='Register' />
            </form>
        </div>
    );
}

export default Registration;