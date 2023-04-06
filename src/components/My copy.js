import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Friends.scss'

function My({images}) {
  return (
    <Link to = "/Profile" state={{images}}>
    <img src={images} alt='profiles'></img>
    </Link>
  )
  
}


export default My