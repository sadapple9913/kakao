import React, { useEffect, useState } from "react";
import Header from '../components/Header'
import Tab from '../components/Tab'
import {FaSistrix } from "react-icons/fa";
import My from '../components/My'
import User from '../components/User'
import profiles from '../data/profiles.json'
import axios from 'axios';

import '../styles/Friends.scss'



function Friends() {

  const [datas, setDatas] = useState([]);


  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () =>{ //async는 비동기식이라는 뜻
   const {
     data : {
      datas
  }} =  
  await axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {setDatas(response.data)})
  console.log(datas);
  setDatas(datas);

}

const profilesImages = profiles.slice(3, 10).map((profile) => profile.images);
const datasNamesIds = datas.slice(3, 10).map((profile) => ({
  id: profile.id,
  name :profile.name,
}));

const combinedProfiles = profilesImages.map((image,index) => ({
  ...datasNamesIds[index],
  images: image,
}));
console.log(combinedProfiles);
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
        <section class="main_section">
        <h2>My Profile</h2>
        {profiles.slice(0, 2).map((profile) => (
                    <My
                    images={profile.images} 
                    name={profile.name} 
                    id={profile.id} 
                    />
                  ))}
     </section>

            <section className="main_section">
            <h2>Friends</h2>
            <ul>
              <li className="Friend_wrap">
              {combinedProfiles.map((profile) => (
                  <User
                    name={profile.name}
                    id={profile.id}
                    images={profile.images}
                  />
                ))}
              </li>
            </ul>
          </section>

        {/* //main_section */}
      </main>

      <Tab />
    </div>
  );
}


export default Friends