import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Header.scss';

function Header() {
    const { user, logout } = useContext(AuthContext);

    return(
        <header id='header'>
            <nav>
                <div id='logo'>3D Web Museum</div>

                <ul>
                    {user ? (
                        <>
                            <li className='colorful-button'><NavLink to='/exhibition-list'>Exhibitions</NavLink></li>
                            
                            {user.role === 'Admin' && (
                                <>
                                    <li><NavLink to='/users-table'>Users</NavLink></li>
                                    <li><NavLink to='/reports-list'>Reports</NavLink></li>
                                </>
                            )}
                            
                            <li><NavLink to='/settings'>Settings</NavLink></li>
                            <li><button  className='nav-link-button' onClick={logout}>Log Out</button></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to='/login'>Log In</NavLink></li>
                            <li className='colorful-button'><NavLink to='/registration'>Sign Up</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;