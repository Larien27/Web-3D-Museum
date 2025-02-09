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
                    <li><NavLink to='/exhibition'>Exhibition</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/registration'>Registration</NavLink></li>
                    <li><NavLink to='/favorites'>Favorites</NavLink></li>
                    <li><NavLink to='/settings'>Settings</NavLink></li>
                    <li><NavLink to='/exhibition-list'>Exhibition List</NavLink></li>
                    <li><NavLink to='/users-table'>Users Table</NavLink></li>
                    <li><NavLink to='/reports-list'>Reports List</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;