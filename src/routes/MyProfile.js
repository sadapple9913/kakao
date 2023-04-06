import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import {FaPencilAlt } from "react-icons/fa";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, } from "firebase/auth";
import {auth,} from '../fbase'
import Edit from "../components/Edit";
import "../styles/MyProfile.scss";


function MyProfile({userObj}) {
  console.log(userObj);
  const navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };
  
 
  return (
    <div className="profile_wrap">
    <ProfileHeader />

    <div className="profile_main">
      <section className="background">
        <h2 className="blind">My profile background image</h2>
        <img src={userObj.photoURL} alt="Profile image" />
      </section>

        <section className="profile">
          <h2 className="blind">My profile info</h2>
          <div className="Profile_profile_img empty">
            <img src={userObj.photoURL} alt="Profile image" />
            <images />
          </div>
          <div className="profile_cont">
            <span className="profile_name">{userObj.displayName}</span>
            <input
              type="mail"
              className="profile_email"
              placeholder="Userid@gmail.com"
            />
            <Link to="/Edit" userObj={userObj}>
            <ul className="profile_menu">
              <li>
                <span className="icon">
                  <FaPencilAlt />
                </span>
                Edit Profile
              </li>
            </ul>
            </Link>
          </div>
        </section>

      <button className="LogOut" onClick={onLogOutClick}>LogOut</button>
    </div>
  </div>
);
}

export default MyProfile;