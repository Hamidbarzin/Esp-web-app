// Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.css';
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // بررسی وضعیت ورود کاربر
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      // اگر کاربر قبلاً وارد شده، به داشبورد هدایت می‌شود
      navigate('/dashboard');
    } else {
      // اگر کاربر وارد نشده، به صفحه ورود هدایت می‌شود
      navigate('/login');
    }
  }, [navigate]);

  // نمایش یک صفحه لودینگ در حالی که ریدایرکت انجام می‌شود
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #3498db, #2c3e50)',
      color: 'white'
    }}>
      <h1>ESP داشبورد</h1>
      <p>در حال بارگذاری...</p>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid rgba(255, 255, 255, 0.3)',
        borderTop: '5px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginTop: '20px'
      }}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;