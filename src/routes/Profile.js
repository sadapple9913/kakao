import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { FaComment, FaPencilAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../styles/Profile.scss";

function Profile() {
  const location = useLocation(); //react-router-dom에서 제공하는 함수
  console.log(location);

  const { images, name, id, city } = location.state;

  return (
    <div className="profile_wrap">
      <ProfileHeader />

      <div className="profile_main">
        <section className="background">
          <h2 className="blind">My profile background image</h2>
          <img src={images} alt="Profile image" />
        </section>
        <section className="profile">
          <h2 className="blind">My profile info</h2>
          <div className="Profile_profile_img empty">
          <img src={images} alt="Profile image" />
            <images />
          </div>  
          <div className="profile_cont">
            <span className="profile_name">{name}</span>
            <input
              type="mail"
              className="profile_email"
              placeholder="Userid@gmail.com"
            />
            <ul className="profile_menu">
              <li>
                <Link to="/Chatting " state={{ images, name, id, city }}>
                  <span className="icon">
                    <FaComment />
                  </span>
                  My chatroom
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
