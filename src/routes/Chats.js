import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Tab from "../components/Tab";
import { FaSistrix, FaComment } from "react-icons/fa";
import ChatList from "../components/ChatList";
import profiles from "../data/profiles.json";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Chats.scss";

function Chats() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const datas = response.data
    setDatas(datas);
    console.log(datas); // log the updated data
  }

  const profilesImages = profiles.map((profile) => profile.images);
  const datasNamesIds = datas.map((profile) => ({
    id: profile.id,
    name: profile.name,
    city: profile.address.city,
    username: profile.username,
  }));
  
  const combinedProfiles = profilesImages.map((image, index) => ({
    ...datasNamesIds[index],
    images: image,
    backImages: profiles[index].backImages
  }));

  return (
    <div className="Chat_wrap">
      <Header />

      <div className="main">
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

        <section className="main_section2">
          <div className="blind">
            <h2>Friends</h2>
          </div>
          {combinedProfiles.map((profile) => (
            <ChatList
              key={profile.key}
              name={profile.name}
              id={profile.id}
              images={profile.images}
              city={profile.city}
              username={profile.username}
              backImages={profile.backImages}
            />
          ))}
        </section>
      </div>

      <div className="floating">
        <div className="chat_fa_btn">
          <div>
            <FaComment />
          </div>
        </div>
      </div>

      <Tab />
    </div>
  );
}

export default Chats;
