import React from 'react';
import '../../styles/style.css';

const Header = ({ title, description }) => {
  return (
    <div className="content-header">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Header;