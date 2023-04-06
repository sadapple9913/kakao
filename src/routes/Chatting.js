import React from 'react'
import ChattingHeader from '../components/ChattingHeader';
import {FaPlus,FaRegSmileBeam,FaMicrophone} from "react-icons/fa";
import '../styles/Chatting.scss';
import { Link, useLocation } from 'react-router-dom';


function Chatting() {
  
  const location = useLocation();//react-router-dom에서 제공하는 함수
  console.log(location);


  
  const {name , images ,id} =  location.state;

  return (
    <div className='Chatting_wrap'>
      
    <ChattingHeader />
    
    <div className='chatting_main'>
    <span className="date_info">{id}</span>

    <div className="chat_box my">
      <span className="chat">{id}</span>
      <span className="chat">
        Hello! This is a test message. Hello! This is a test message. Hello! This is a test message.
      </span>
      <span className="chat">Hello! This is a test message. </span>
      <span className="chat_time">
        <span>15</span>:<span>33</span>
      </span>
    </div>

    <div className="chat_box other">
      <div className="other_info">
        <a href="#">
        <Link to={`/profile/${id}`}>
          <span className="profile_img empty">
            <img src={images}/>
          </span>
        </Link>
        </a>
        <span className="profile_name">{name}</span>
      </div>
      <span className="chat">{name}</span>
      <span className="chat">qwe{id}</span>
      <span className="chat">And this is an answer</span>
      <span className="chat_time">
        <span>17</span>:<span>33</span>
      </span>
    </div>

    <footer>
      <span className="plus_btn">
        <a href="#">
          <FaPlus/>
        </a>
      </span>
      <form action="/" method="post" className='from'>
        <fieldset className="text_box">
          <legend className="blind">채팅입력창</legend>
          <label htmlFor="chatting" className="blind">
            채팅 입력
          </label>
          <input type="text" id="chatting" className="text_field" />
          <span className="emoticon_btn">
            <a href="#">
              <FaRegSmileBeam/>
            </a>
          </span>
          <span className="voice_btn">
            <a href="#">
              <FaMicrophone/>
            </a>
          </span>
        </fieldset>
      </form>
    </footer>
  </div>
  </div>
  )
}

export default Chatting