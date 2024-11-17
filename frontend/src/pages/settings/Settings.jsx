function Settings() {
    return(
        <div id='settings'>
            <h1>Settings</h1>
            
            <h2>Change username</h2>
            <form>
                <label for='changeUsername__currentUsername'>Current username:</label>
                <input type='text' id='changeUsername__currentUsername' />
                <label for='changeUsername__newUsername'>New username:</label>
                <input type='text' id='changeUsername__newUsername' />
                <label for='changeUsername__password'>Password:</label>
                <input type='password' id='changeUsername__password' />
                <input type='submit' value='Apply' />
            </form>
            
            <hr />

            <h2>Change email</h2>
            <form>
                <label for='changeUsername__currentEmail'>Current email:</label>
                <input type='email' id='changeUsername__currentEmail' />
                <label for='changeEmail__newEmail'>New email:</label>
                <input type='email' id='changeEmail__newEmail' />
                <label for='changeEmail__password'>Password:</label>
                <input type='password' id='changeEmail__password' />
                <input type='submit' value='Apply' />
            </form>
            
            <hr />
            
            <h2>Change password</h2>
            <form>
                <label for='changePassword__username'>Username:</label>
                <input type='text' id='changePassword__username' />
                <label for='changePassword__currentPassword'>Current password:</label>
                <input type='password' id='changePassword__currentPassword' />
                <label for='changePassword__newPassword'>New password:</label>
                <input type='password' id='changePassword__newPassword' />
                <input type='submit' value='Apply' />
            </form>
        </div>
    );
}

export default Settings;