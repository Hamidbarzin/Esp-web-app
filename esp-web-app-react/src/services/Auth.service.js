// سرویس احراز هویت
// در حال حاضر از api استفاده نمی‌کنیم زیرا داریم از localStorage استفاده می‌کنیم
// import { api } from './api';

// تابع ورود به سیستم
export const login = async (email, password) => {
    try {
      // در حالت واقعی، درخواست API ارسال می‌شود
      // const response = await api.post('/auth/login', { email, password });
  
      // برای این نمونه، مستقیماً از localStorage استفاده می‌کنیم
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      if (userData.email === email && userData.password === password) {
        // ذخیره tokenها در localStorage
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // تابع ثبت نام
  export const register = async (fullName, email, password, profileImage = null) => {
    try {
      // در حالت واقعی، درخواست API ارسال می‌شود
      // const response = await api.post('/auth/register', { fullName, email, password });
      
      // برای این نمونه، مستقیماً در localStorage ذخیره می‌کنیم
      const userData = {
        fullName,
        email,
        password,
        profileImage
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };
  
  // تابع خروج از سیستم
  export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // در این مثال userData را حذف نمی‌کنیم تا بتوانیم دوباره وارد شویم
    // در حالت واقعی می‌توان درخواست API برای خروج ارسال کرد
    // await api.post('/auth/logout');
    
    return true;
  };
  
  // بررسی وضعیت احراز هویت
  export const checkAuthStatus = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    return {
      isLoggedIn,
      userData
    };
  };