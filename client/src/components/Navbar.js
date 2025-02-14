// client/src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('');
  };

  // Hide navbar on homepage when not logged in.
  if (location.pathname === '/' && !currentUser) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">FarmiCulture</Link>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {currentUser && (
          <>
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/crop-recommendation" 
                className={location.pathname === '/crop-recommendation' ? 'active' : ''}
              >
                Crops
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/fertilizer-recommendation" 
                className={location.pathname === '/fertilizer-recommendation' ? 'active' : ''}
              >
                Fertilizer
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/disease-detection" 
                className={location.pathname === '/disease-detection' ? 'active' : ''}
              >
                Disease
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/forum" 
                className={location.pathname === '/forum' ? 'active' : ''}
              >
                Forum
              </Link>
            </li>
          </>
        )}

        <div className="auth-links">
          {currentUser ? (
            <>
              <li className="nav-item user-info">
                <img
                  src={currentUser.profilePicture || '/assets/profile.png'}
                  alt="User Avatar"
                  className="navbar-avatar"
                />
                <span className="navbar-username">
                  {currentUser.username || currentUser.fullName}
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to="/register" 
                  className={location.pathname === '/register' ? 'active' : ''}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/login" 
                  className={location.pathname === '/login' ? 'active' : ''}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;