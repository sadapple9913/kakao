import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Chats.scss'


function ChatList({images,name,id}) {
  
  return (
    <ul>
    <li>
    <Link to = '/Chatting '  state={{images,name,id}}>
        <span className="chats_img empty">
        <img src={images} alt="My Image"></img>
        </span>
        <span className="chats_cont">
          <span className="chats_name">{name}</span>
          <span className="chats_latest">{id}</span>
        </span>
        <span className="chats_time"><span>15</span>:<span>33</span></span>
    </Link>
    </li>
  </ul>
  )
}

export default ChatList