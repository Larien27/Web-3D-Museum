import './Header.scss';

function Header() {
    return(
        <div id='header'>
            <div id='logo'></div>
            <ul>
                <li><a href='#'>Login</a></li>
                <li><a href='#'>Registration</a></li>
                <li><a href='#'>Favourites</a></li>
                <li><a href='#'>Settings</a></li>
            </ul>
        </div>
    );
}

export default Header;