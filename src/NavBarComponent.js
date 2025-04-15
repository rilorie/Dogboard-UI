import React from 'react';
import './Navbar.css';

const NavBarComponent = () => {

  const token = sessionStorage.getItem('jwtToken');

  return (

    <nav className="navbar">
      <div className="navbar-left pr5">
        <a href="/" className="logo">
          Dogboard
        </a>
      </div>
      <div className="navbar-center mr-auto">
        <ul className="nav-links">
          <li className='pr3'>
            <a href="/singlephoto">Give me a photo</a>
          </li>
          <li>
            <a href="/boards">Your boards</a>
          </li>

        </ul>
      </div>
      <div className="navbar-center">

        <ul className="nav-links">
          {token === null ? <li>
            <a href="/login">Login</a>
          </li> : <div className='ml-auto' style={{ cursor: "pointer" }} onClick={() => {
            sessionStorage.removeItem('jwtToken');
            sessionStorage.removeItem('userId')
            window.location.reload();

          }}>Logout</div>}

        </ul>

      </div>
    </nav>
  );
};

export default NavBarComponent;