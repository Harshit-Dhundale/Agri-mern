import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './AuthLayout.css';

const AuthLayout = () => (
  <div className="auth-layout" style={{ backgroundImage: 'url(/assets/auth.jpg)' }}>
    <Navbar /> {/* Add the Navbar here */}
    <Outlet />
  </div>
);

export default AuthLayout;
