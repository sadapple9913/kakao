import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import {FaRegSmileBeam,FaInfoCircle,FaUtensils,FaTv,FaPencilAlt,FaGraduationCap,FaWonSign,FaVideo} from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import My from '../components/My';
import '../styles/More.scss'


function More({userObj}) {
  return (
    <div className='more_wrap'>
    <Header />
    <div className='main'>
    <section className="user_info">
      <h2 className="blind">사용자 정보</h2>
        <My userObj={userObj} />
    </section>

    <section className="user_menu">
      <h2 className="blind">사용자메뉴</h2>
      <ul>
        <li>
          <FaRegSmileBeam />
          Emoticons
          </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
          mail
          </li>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-user-plus" />
          plus Friends
          </li>
        <li>
        <FontAwesomeIcon icon="fa-solid fa-gift" />
          gift
          </li>
      </ul>
    </section>

    <section className="plus_friends">
      <div className='tit'>
        <h2>Plus Friends</h2>
        <span><FaInfoCircle /> Learn More </span>
      </div>
      <ul className="plus_list">
        <li><FaUtensils />Order</li>
        <li>
        <FontAwesomeIcon icon="fa-solid fa-store" />Store
        </li>
        <li><FaTv />Tv Channel/Radio</li>
        <li><FaPencilAlt />Creation</li>
        <li><FaGraduationCap />Education</li>
        <li>
        <FontAwesomeIcon icon="fa-solid fa-landmark-dome" />
          politics/Society
          </li>
        <li><FaWonSign />Finance</li>
        <li><FaVideo />Movies/Music</li>
      </ul>
    </section>

    <section className="more_app">
      <h2 className="blind">앱 더보기</h2>
      <ul>
        <li><span className="app_icon"></span>Totalk Story</li>
        <li><span className="app_icon"></span>Path</li>
        <li><span className="app_icon"></span>Totalk friends</li>
      </ul>
    </section>
  </div>
  <Tab />
  </div>
);
};


export default More