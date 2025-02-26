import React from 'react';
import '../../styles/style.css';

const DashboardStats = () => {
  // داده‌های نمونه که می‌توان از API دریافت کرد
  const stats = [
    {
      id: 1,
      title: 'مشتریان فعال',
      value: '۱۲۵ مشتری',
      icon: 'fas fa-users'
    },
    {
      id: 2,
      title: 'پروژه‌های جاری',
      value: '۸ پروژه',
      icon: 'fas fa-tasks'
    },
    {
      id: 3,
      title: 'محموله‌های در راه',
      value: '۱۵ محموله',
      icon: 'fas fa-shipping-fast'
    },
    {
      id: 4,
      title: 'درآمد ماهانه',
      value: '۱۵,۰۰۰,۰۰۰ تومان',
      icon: 'fas fa-chart-line'
    }
  ];

  return (
    <div className="dashboard-cards">
      {stats.map(stat => (
        <div className="card" key={stat.id}>
          <div className="card-icon">
            <i className={stat.icon}></i>
          </div>
          <h3>{stat.title}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;