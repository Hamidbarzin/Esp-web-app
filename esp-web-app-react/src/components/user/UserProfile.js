import React, { useState, useEffect } from 'react';
import '../../styles/style.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    profileImage: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // دریافت اطلاعات کاربر از لوکال استوریج
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserData(storedUserData);
    setFormData({
      fullName: storedUserData.fullName || '',
      email: storedUserData.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // بررسی رمز عبور فعلی
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (formData.currentPassword && formData.currentPassword !== storedUserData.password) {
      setMessage({ text: 'رمز عبور فعلی اشتباه است', type: 'error' });
      return;
    }

    // بررسی تطابق رمز عبور جدید
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'رمز عبور جدید و تکرار آن مطابقت ندارند', type: 'error' });
      return;
    }

    // به‌روزرسانی اطلاعات کاربر
    const updatedUserData = {
      ...storedUserData,
      fullName: formData.fullName,
      email: formData.email,
      profileImage: userData.profileImage
    };

    // به‌روزرسانی رمز عبور در صورت تغییر
    if (formData.newPassword) {
      updatedUserData.password = formData.newPassword;
    }

    // ذخیره اطلاعات جدید
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setIsEditing(false);
    setMessage({ text: 'اطلاعات با موفقیت به‌روزرسانی شد', type: 'success' });

    // پاک کردن فیلدهای رمز عبور
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <input 
            type="file" 
            id="profileImageUpload" 
            className="hidden" 
            accept="image/*"
            onChange={handleProfileUpload} 
          />
          <label htmlFor="profileImageUpload" className="profile-image-label">
            {userData.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt="تصویر پروفایل" 
                className="profile-image" 
              />
            ) : (
              <div className="profile-image-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
            <div className="profile-image-edit">
              <i className="fas fa-camera"></i>
            </div>
          </label>
        </div>
        <div className="profile-info">
          <h2>{userData.fullName || 'کاربر ESP'}</h2>
          <p>{userData.email || 'بدون ایمیل'}</p>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-card-header">
          <h3>اطلاعات شخصی</h3>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'انصراف' : 'ویرایش'}
            <i className={`fas fa-${isEditing ? 'times' : 'edit'}`}></i>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>نام کامل</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
            </div>

            <div className="form-group">
              <label>ایمیل</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
            </div>

            <div className="form-divider">تغییر رمز عبور</div>

            <div className="form-group">
              <label>رمز عبور فعلی</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
                <i className="fas fa-lock"></i>
              </div>
            </div>

            <div className="form-group">
              <label>رمز عبور جدید</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <i className="fas fa-key"></i>
              </div>
            </div>

            <div className="form-group">
              <label>تکرار رمز عبور جدید</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <i className="fas fa-key"></i>
              </div>
            </div>

            <button type="submit" className="save-button">
              ذخیره تغییرات
              <i className="fas fa-save"></i>
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-row">
              <div className="detail-label">نام کامل:</div>
              <div className="detail-value">{userData.fullName || 'تنظیم نشده'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">ایمیل:</div>
              <div className="detail-value">{userData.email || 'تنظیم نشده'}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">وضعیت حساب:</div>
              <div className="detail-value">
                <span className="status-badge active">فعال</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-label">تاریخ عضویت:</div>
              <div className="detail-value">
                {new Date().toLocaleDateString('fa-IR')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;