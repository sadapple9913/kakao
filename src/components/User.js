import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Friends.scss'

function User({images,name,id,}) {

  return (
    <li className="friend_wrap">
    <Link to = "/Profile" state={{images,name,id}}>
        <span className="Profile_img empty">
        <img src={images} alt="My Image"></img>
        </span>
        <span className="Profile_name">{name}</span>
        <span className="profile_messages">{id}</span>
    </Link>
    </li>
  )
}

export default User