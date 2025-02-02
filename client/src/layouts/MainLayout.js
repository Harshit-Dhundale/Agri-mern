import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './MainLayout.css';

const MainLayout = () => (
  <div className="main-layout">
    <Navbar />
    <main className="container">
      <Outlet /> {/* This is where child routes will render */}
    </main>
  </div>
);

export default MainLayout;