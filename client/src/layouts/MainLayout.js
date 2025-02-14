// client/src/layouts/MainLayout.js
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();
  // Check if current route is home
  const isHome = location.pathname === "/";
  return (
    <div className="main-layout">
      <Navbar />
      <main className={`container ${isHome ? "full-width" : ""}`}>
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
};

export default MainLayout;