import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ username }) => (
  <div className="bg-primary text-white py-4">
    <div className="container">
      <div className="row text-center text-md-start">
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center mb-3 mb-md-0">
          <h1 className="display-4 mb-0">{username ? username.toUpperCase() : "Default Name"}</h1>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center">
  <NavLink 
    to={`/${username}`} 
    className={({ isActive }) => `btn mx-2 ${isActive ? 'btn-warning' : 'btn-light'}`}
    end // Use end for exact match
  >
    Home
  </NavLink>
  <NavLink 
    to={`/${username}/about`} 
    className={({ isActive }) => `btn mx-2 ${isActive ? 'btn-warning' : 'btn-light'}`}
    end
  >
    About
  </NavLink>
  <NavLink 
    to={`/${username}/contact`} 
    className={({ isActive }) => `btn mx-2 ${isActive ? 'btn-warning' : 'btn-light'}`}
    end
  >
    Contact
  </NavLink>
</div>

      </div>
    </div>
  </div>
);

export default Header;
