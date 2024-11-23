import './Header.scss';
import { NavLink } from 'react-router-dom';

function Header() {
    return(
        <header id='header'>
            <nav>
                <div id='logo'>
                    <NavLink to='/'>Logo TBA</NavLink>
                </div>

                <ul>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/registration'>Registration</NavLink></li>
                    <li><NavLink to='/favourites'>Favourites</NavLink></li>
                    <li><NavLink to='/settings'>Settings</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;