import React from 'react';
import SideMenuContent from './style';
import { useNavigate } from 'react-router-dom';

const Sidemenu = () => {
  const navigate = useNavigate();
  return (
    <SideMenuContent>
      <div id="side-menu">
        <div className="card col-md-4">
          <div className="user-img"></div>
          <span className="user-name">John Doe </span>
          <span className="user-title">Full Stack Web Developer</span>
        </div>

        <nav>
          <a href="/">
             Log Out
          </a>
          {/* <a href="#">
             Account
          </a> */}
        </nav>
      </div>
    </SideMenuContent>
  );
};

export default Sidemenu;
