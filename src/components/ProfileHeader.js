import React from 'react';
import { FaPlane , FaWifi , FaMoon , FaBluetoothB ,FaUserCog ,FaArrowLeft} from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/ProfileHeader.scss'


function ProfileHeader() {
  
  return (

    <div className='Profile_wrap'>
    <header>
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
      <div className="title_bar">
      <h1 className='blind'>Profile</h1>
        <div className="left_item">
          <Link to="/">
          <FaArrowLeft/>
          </Link>
        </div>
        <div className="right_item">
            <FaUserCog />
        </div>
      </div>
    </header>
    </div>
  );
}

export default ProfileHeader;







