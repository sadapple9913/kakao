import React from "react";
import Header from '../components/Header'
import Tab from '../components/Tab'
import {FaSistrix } from "react-icons/fa";
import My from '../components/My'
import User from '../components/User'
import profiles from '../data/profiles.json'
import '../styles/Friends.scss'

function Friends({images,name}) {

  return (
    <div className="friend_wrap">

      <Header />

      <main className="main">
        {/* search_box */}
        <form className="search_box">
          <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <FaSistrix />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Find firends , chats , Plus Friends"
            />
          </fieldset>
        </form>
        {/* //search_box */}
        {/* main_section */}
        <section className="main_section">
          <h2>My Profile</h2>
          <ul>
            <li>       
                <span className="Profile_img empty ">
                {profiles.slice(0 , 1).map((profile) => (
                    <My
                    images={profile.images} 
                    />
                  ))}
                </span>
                <span className="Profile_name">name</span>
            </li>
            <li>

                <span className="Profile_img empty">
                {profiles.slice(1, 2).map((profile) => (
                    <My
                    images={profile.images} 
                    />
                  ))}
                </span>
                <span className="Profile_name">Friends` Names Display</span>
            </li>
          </ul>
        </section>

        <section className="main_section">
          <h2>Friends</h2>
          {profiles.slice(3, 10).map((profile) => (
                    <User
                    images={profile.images} 
                    name={profile.name} 
                    />
                  ))}
        </section>
        {/* //main_section */}
      </main>

      <Tab />
    </div>
  );
}


export default Friends