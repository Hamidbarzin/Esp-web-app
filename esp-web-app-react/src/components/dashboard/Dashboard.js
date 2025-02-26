import React from 'react';
import Navbar from '../navigation/Navbar';
import DashboardStats from './DashboardStats';
import Header from '../Common/Header';
import '../../styles/style.css';

const Dashboard = () => {
  return (
    <div className="container">
      <Navbar />
      <main className="content">
        <Header 
          title="به داشبورد خوش آمدید"
          description="خلاصه وضعیت و آمار کلی"
        />
        <DashboardStats />
      </main>
    </div>
  );
};

export default Dashboard;