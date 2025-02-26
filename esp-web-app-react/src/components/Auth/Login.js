import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Auth.service';
import '../../styles/style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide welcome screen after animation
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard');
    }

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError('ایمیل یا رمز عبور اشتباه است');
      }
    } catch (err) {
      setError('خطا در ورود به سیستم');
      console.error(err);
    }
  };

  return (
    <>
      {showWelcome && (
        <div className="welcome-screen">
          <h1>به داشبورد ESP خوش آمدید</h1>
          <p>لطفاً وارد شوید</p>
        </div>
      )}

      <div className="auth-container">
        <div className="auth-card">
          <div className="profile-upload">
            <div className="profile-preview">
              <i className="fas fa-user default-avatar"></i>
            </div>
          </div>

          <h2>ورود به حساب</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="ایمیل"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input 
                  type="password" 
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="fas fa-lock"></i>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn">
              <i className="fas fa-sign-in-alt"></i>
              <span>ورود</span>
            </button>
          </form>

          <div className="toggle-auth">
            <p>
              <span>حساب کاربری ندارید؟</span>
              <Link to="/register" className="toggle-btn">ثبت نام</Link>
            </p>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <i className="fab fa-google"></i>
            </button>
            <button className="social-btn github">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;