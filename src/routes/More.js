import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import {FaRegComment,FaRegSmileBeam,FaPaintBrush,FaRegHandPeace,FaUserAlt,FaInfoCircle,FaUtensils,FaHome,FaTv,FaPencilAlt,FaGraduationCap,FaArchway,FaWonSign,FaVideo} from "react-icons/fa";
import profiles from '../data/profiles.json'
import Profile from './Profile'
import My from '../components/My';

import '../styles/More.scss'
import { Link } from 'react-router-dom';


function More({userObj , images}) {
  return (
    <div className='more_wrap'>
    <Header />
    <div className='main'>
    <section className="user_info">
      <h2 className="blind">사용자 정보</h2>
        <My userObj={userObj} />
      <span className="chat_img"><FaRegComment /></span>
    </section>

    <section className="user_menu">
      <h2 className="blind">사용자메뉴</h2>
      <ul>
        <li><a href="#"><FaRegSmileBeam />Emoticons</a></li>
        <li><a href="#"><FaPaintBrush />Themes</a></li>
        <li><a href="#"><FaRegHandPeace />plus Friends</a></li>
        <li><a href="#"><FaUserAlt />Account</a></li>
      </ul>
    </section>

    <section className="plus_friends">
      <div className='tit'>
        <h2>Plus Friends</h2>
        <span><FaInfoCircle /> Learn More </span>
      </div>
      <ul className="plus_list">
        <li><a href="#"><FaUtensils />Order</a></li>
        <li><a href="#"><FaHome />Store</a></li>
        <li><a href="#"><FaTv />Tv Channel/Radio</a></li>
        <li><a href="#"><FaPencilAlt />Creation</a></li>
        <li><a href="#"><FaGraduationCap />Education</a></li>
        <li><a href="#"><FaArchway />politics/Society</a></li>
        <li><a href="#"><FaWonSign />Finance</a></li>
        <li><a href="#"><FaVideo />Movies/Music</a></li>
      </ul>
    </section>

    <section className="more_app">
      <h2 className="blind">앱 더보기</h2>
      <ul>
        <li><a href="#"><span className="app_icon"></span>Kakao Story</a></li>
        <li><a href="#"><span className="app_icon"></span>Path</a></li>
        <li><a href="#"><span className="app_icon"></span>Kakao friends</a></li>
      </ul>
    </section>
  </div>
  <Tab />
  </div>
);
};


export default More