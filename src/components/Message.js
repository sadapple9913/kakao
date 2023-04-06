import React from 'react'
import PropTypes from 'prop-types';

import '../styles/Friends.scss'

function Message({title}) {

  return (
    <span className="profile_messages">{title}</span>
  )
}


export default Message