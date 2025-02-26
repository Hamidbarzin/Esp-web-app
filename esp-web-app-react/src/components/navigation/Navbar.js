import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/style.css';

const Navbar = () => {
  const [activeSubmenus, setActiveSubmenus] = useState({
    crm: false,
    crp: false,
    it: false
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const toggleSubmenu = (menu) => {
    setActiveSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/esp-logo.svg" alt="ESP Logo" />
        <h2>داشبورد ESP</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
              <i className="fas fa-home"></i>خانه
            </Link>
          </li>
          <li>
            <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
              <i className="fas fa-user"></i>پروفایل
            </Link>
          </li>
          <li>
            <a 
              href="#crm"
              onClick={(e) => { e.preventDefault(); toggleSubmenu('crm'); }}
              className={activeSubmenus.crm ? 'submenu-active' : ''}
            >
              <i className="fas fa-users"></i>مدیریت مشتریان
              <i className={`fas fa-chevron-left arrow ${activeSubmenus.crm ? 'rotated' : ''}`}></i>
            </a>
            <ul className={`submenu ${activeSubmenus.crm ? 'active' : ''}`} id="crm-submenu">
              <li>
                <Link to="/crm/new-lead">
                  <i className="fas fa-user-plus"></i>مشتری جدید
                </Link>
              </li>
              <li>
                <Link to="/crm/tasks">
                  <i className="fas fa-tasks"></i>وظایف
                </Link>
              </li>
              <li>
                <Link to="/crm/reports">
                  <i className="fas fa-chart-line"></i>گزارش‌ها
                </Link>
              </li>
              <li>
                <Link to="/crm/meetings">
                  <i className="fas fa-calendar"></i>جلسات
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a 
              href="#crp"
              onClick={(e) => { e.preventDefault(); toggleSubmenu('crp'); }}
              className={activeSubmenus.crp ? 'submenu-active' : ''}
            >
              <i className="fas fa-project-diagram"></i>مدیریت پروژه‌ها
              <i className={`fas fa-chevron-left arrow ${activeSubmenus.crp ? 'rotated' : ''}`}></i>
            </a>
            <ul className={`submenu ${activeSubmenus.crp ? 'active' : ''}`} id="crp-submenu">
              <li>
                <Link to="/crp/documents">
                  <i className="fas fa-file-alt"></i>اسناد
                </Link>
              </li>
              <li>
                <Link to="/crp/operations">
                  <i className="fas fa-cogs"></i>عملیات
                </Link>
              </li>
              <li>
                <Link to="/crp/analytics">
                  <i className="fas fa-chart-pie"></i>تحلیل‌ها
                </Link>
              </li>
              <li>
                <Link to="/crp/finance">
                  <i className="fas fa-dollar-sign"></i>مالی
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/post-management" className={isActive('/post-management') ? 'active' : ''}>
              <i className="fas fa-box"></i>مدیریت پست
            </Link>
          </li>
          <li>
            <Link to="/air-freight" className={isActive('/air-freight') ? 'active' : ''}>
              <i className="fas fa-plane"></i>حمل و نقل هوایی
            </Link>
          </li>
          <li>
            <Link to="/sea-freight" className={isActive('/sea-freight') ? 'active' : ''}>
              <i className="fas fa-ship"></i>حمل و نقل دریایی
            </Link>
          </li>
          <li>
            <Link to="/land-freight" className={isActive('/land-freight') ? 'active' : ''}>
              <i className="fas fa-truck"></i>حمل و نقل زمینی
            </Link>
          </li>
          <li>
            <Link to="/tracking" className={isActive('/tracking') ? 'active' : ''}>
              <i className="fas fa-search"></i>کد رهگیری
            </Link>
          </li>
          <li>
            <a 
              href="#it"
              onClick={(e) => { e.preventDefault(); toggleSubmenu('it'); }}
              className={activeSubmenus.it ? 'submenu-active' : ''}
            >
              <i className="fas fa-laptop-code"></i>فناوری اطلاعات
              <i className={`fas fa-chevron-left arrow ${activeSubmenus.it ? 'rotated' : ''}`}></i>
            </a>
            <ul className={`submenu ${activeSubmenus.it ? 'active' : ''}`} id="it-submenu">
              <li>
                <Link to="/it/web-development">
                  <i className="fas fa-globe"></i>توسعه وب
                </Link>
              </li>
              <li>
                <Link to="/it/app-development">
                  <i className="fas fa-desktop"></i>توسعه نرم‌افزار
                </Link>
              </li>
              <li>
                <Link to="/it/mobile-development">
                  <i className="fas fa-mobile-alt"></i>توسعه موبایل
                </Link>
              </li>
              <li>
                <Link to="/it/seo">
                  <i className="fas fa-search"></i>سئو
                </Link>
              </li>
              <li>
                <Link to="/it/social-media">
                  <i className="fas fa-hashtag"></i>شبکه‌های اجتماعی
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
              <i className="fas fa-cog"></i>تنظیمات
            </Link>
          </li>
          <li>
            <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <i className="fas fa-sign-out-alt"></i>خروج
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;