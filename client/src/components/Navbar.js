// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // This checks if the user is on the homepage and not logged in
    if (location.pathname === '/' && !localStorage.getItem('user')) {
        return null;  // Don't render Navbar on homepage for non-logged in users
    }

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/forum">Forum</Link></li>
                <li><Link to="/crops">Crops</Link></li>
                <li><Link to="/fertilizer">Fertilizer</Link></li>
                <li><Link to="/disease">Disease</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
