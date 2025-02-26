import React from 'react';
import Navbar from '../navigation/Navbar';
import Header from '../Common/Header';
import UserProfile from './UserProfile';
import '../../styles/style.css';

const Profile = () => {
  return (
    <div className="container">
      <Navbar />
      <main className="content">
        <Header 
          title="پروفایل کاربری"
          description="اطلاعات شخصی و تنظیمات حساب"
        />
        <UserProfile />
      </main>
    </div>
  );
};

export default Profile;