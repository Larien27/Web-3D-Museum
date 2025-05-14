import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import './Header.scss';

function Header() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return(
        <header id='header'>
            <nav>
                <div id='logo'>3D Web Museum</div>

                <button className='hamburger' onClick={toggleMenu}>
                    ☰
                </button>

                <ul className={menuOpen ? 'open' : ''}>
                    {user ? (
                        <>
                            <li className={menuOpen ? '' : 'colorful-button'}><NavLink to='/exhibition-list' onClick={closeMenu}>Exhibitions</NavLink></li>
                            
                            {user.role === 'Admin' && (
                                <>
                                    <li><NavLink to='/users-table' onClick={closeMenu}>Users</NavLink></li>
                                    <li><NavLink to='/reports-list' onClick={closeMenu}>Reports</NavLink></li>
                                </>
                            )}
                            
                            <li><NavLink to='/settings' onClick={closeMenu}>Settings</NavLink></li>
                            <li><button className='nav-link-button' onClick={() => { logout(); closeMenu(); }}>Log Out</button></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to='/login' onClick={closeMenu}>Log In</NavLink></li>
                            <li className={menuOpen ? '' : 'colorful-button'}><NavLink to='/registration' onClick={closeMenu}>Sign Up</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;