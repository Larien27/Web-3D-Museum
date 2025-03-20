import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Header.scss';

function Header() {
    const { user, logout } = useContext(AuthContext);

    return(
        <header id='header'>
            <nav>
                <div id='logo'>
                    <NavLink to='/'>Logo TBA</NavLink>
                </div>

                <ul>
                    {user ? (
                        <>
                            <li><NavLink to='/exhibition'>Exhibition</NavLink></li>
                            <li><NavLink to='/settings'>Settings</NavLink></li>
                            <li><NavLink to='/exhibition-list'>Exhibition List</NavLink></li>
                            <li><NavLink to='/users-table'>Manage Users</NavLink></li>
                            <li><NavLink to='/reports-list'>Reports List</NavLink></li>
                            <li><NavLink to='/create-exhibition'>Create Exhibition</NavLink></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to='/login'>Login</NavLink></li>
                            <li><NavLink to='/registration'>Registration</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;