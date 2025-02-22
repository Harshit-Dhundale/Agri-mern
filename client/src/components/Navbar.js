import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const toolsDropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(e.target)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout with Redirection
  const handleLogout = async () => {
    try {
      await logout(); // Ensure logout completes before navigating
      setIsMobileMenuOpen(false); // Close mobile menu after logout
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

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
        {/* Always visible links */}
        <li className="nav-item">
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/forum" className={location.pathname === '/forum' ? 'active' : ''}>Forum</Link>
        </li>

        {currentUser && (
          <>
            <li className="nav-item">
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
            </li>
            <li className="nav-item auth-dropdown" ref={toolsDropdownRef}>
              <div 
                className="dropdown-toggle" 
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
              >
                <span className="navbar-username">Smart Tools</span>
                <span className="dropdown-arrow"></span>
              </div>
              {isToolsDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/crop-recommendation')} className="dropdown-item">
                    Crop Recommendation
                  </button>
                  <button onClick={() => navigate('/fertilizer-recommendation')} className="dropdown-item">
                    Fertilizer Recommendation
                  </button>
                  <button onClick={() => navigate('/disease-detection')} className="dropdown-item">
                    Disease Detection
                  </button>
                </div>
              )}
            </li>
          </>
        )}

        <div className="auth-links">
          {currentUser ? (
            <li className="nav-item auth-dropdown" ref={userDropdownRef}>
              <div 
                className="dropdown-toggle" 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <img
                  src={currentUser.profilePicture || '/assets/profile.png'}
                  alt="User Avatar"
                  className="navbar-avatar"
                />
                <span className="navbar-username">
                  {currentUser.username || currentUser.fullName}
                </span>
                <span className="dropdown-arrow"></span>
              </div>
              {isUserDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/profile')} className="dropdown-item">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
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
