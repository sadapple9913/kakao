import React from 'react';
import { FaPlane , FaWifi , FaMoon , FaBluetoothB ,FaAngleLeft ,FaSistrix,FaBars} from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/ChattingHeader.scss'
import { useLocation } from 'react-router-dom';

function ChattingHeader() {

  const location = useLocation();//react-router-dom에서 제공하는 함수
  console.log(location);


  
  const {name} =  location.state;

  return (
    <div className='Chatting_Header_wrap'>
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
      <h1>{name}</h1>
      <div className="left_item">
        <Link to="/Chats">
        <a><FaAngleLeft/></a>
        </Link>
        </div>
      <div className="right_item"><a>
        <FaSistrix /><FaBars /></a></div>
      </div>
      {/* //title_bar */}
    </header>
    </div>
  );
}

export default ChattingHeader;







