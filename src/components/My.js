import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Friends.scss'

function My({images,name}) {
  return (
    <Link to = "/Profile" state={{images,name}}>
         <ul>
        <li className='friend_wrap'>
            <span class="Profile_img empty">
            <img src={images} alt="My Image"></img>
            </span>
            <span class="Profile_name">{name}</span>
        </li>
      </ul>
    </Link>
  )
  
}


export default My