import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Friends.scss";


function My({userObj , images}) {
 console.log(userObj);
  return (
    <Link to="/MyProfile" state={{ images }}>
      <ul>
        <li className="friend_wrap">
          <span class="Profile_img empty">
            <img src={userObj.photoURL} alt="My Image"/>
          </span>
          <span class="Profile_name">{userObj.displayName}</span>
        </li>
      </ul>
    </Link>
  );
}

export default My;
