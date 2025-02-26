import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/Auth.service';
import '../../styles/style.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    try {
      const success = await register(fullName, email, password, profileImage);
      if (success) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError('خطا در ثبت نام');
      }
    } catch (err) {
      setError('خطا در ثبت نام');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="profile-upload">
          <input 
            type="file" 
            id="profileUpload" 
            className="hidden" 
            accept="image/*"
            onChange={handleProfileUpload} 
          />
          <label htmlFor="profileUpload" className="profile-label">
            <div className="profile-preview">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile Preview" 
                  className="profile-img" 
                />
              ) : (
                <i className="fas fa-user default-avatar"></i>
              )}
            </div>
            <div className="upload-icon">
              <i className="fas fa-plus"></i>
            </div>
          </label>
        </div>

        <h2>ایجاد حساب جدید</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="نام کامل"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <i className="fas fa-user"></i>
            </div>
          </div>

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

          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="password" 
                placeholder="تکرار رمز عبور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            <i className="fas fa-user-plus"></i>
            <span>ثبت نام</span>
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            <span>قبلاً ثبت نام کرده‌اید؟</span>
            <Link to="/login" className="toggle-btn">ورود</Link>
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
  );
};

export default Register;