import React from 'react';
import { FaPlane , FaWifi , FaMoon , FaBluetoothB , FaCog} from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/Header.scss'


function Header() {
  return (
    <header>
      {/* status_bar */}
      <div className="status_bar">
        <div className="left_item">
          <FaPlane />
          <FaWifi />
        </div>
        <div className="center_item">
          <span>15</span>:<span>33</span>
        </div>
        <div className="right_item">
          <FaMoon />
          <FaBluetoothB />
          <span><span>100</span>%</span>
        </div>
      </div>
      {/* //status_bar */}

      {/* title_bar */}
      <div className="title_bar">
        <h1>
          Friens <span>1</span>
        </h1>
        <div className="left_item">
          <Link to="/">
            Main
          </Link>
        </div>
        <div className="right_item">

            <FaCog />

        </div>
      </div>
      {/* //title_bar */}
    </header>
  );
}

export default Header;







