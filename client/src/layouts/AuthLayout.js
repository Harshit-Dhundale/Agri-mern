import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => (
  <div className="auth-layout" style={{ backgroundImage: 'url(/assets/farm-background.jpg)' }}>
    <Outlet />
  </div>
);

export default AuthLayout;