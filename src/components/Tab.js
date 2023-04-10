import React from 'react';
import { FaUser, FaComment, FaSistrix, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Tab.scss';

function Nav(name) {
  return (
    <div className='tab_wrap'>
    <nav className="tab_bar">
      <ul>
        <li>
          <Link exact to="/">
            <FaUser />
            Friends
          </Link>
        </li>
        <li>
          <Link to="/Chats" state={{name}}>
            <Link to="/ChatList" state={{name}} />
            <FaComment />
            Chats
          </Link>
        </li>
        <li>
          <Link to="/Find">
            <FaSistrix />
            Find
          </Link>
        </li>
        <li>
          <Link to="/More">
            <FaEllipsisH />
            More
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Nav;