import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Chats.scss";
import LastMessage from "./LastMessage";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../fbase";


function ChatList({ images, name, id , city , backImages },userObj) {

  console.log("1233251",name);

  const [talk, setTalk] = useState("");
  const [talks, setTalks] = useState([]);
  
  const[nowDate , setNowDate] = useState("");

 useEffect(() => {
  async function fetchData() {
    const q = query(collection(db, "talks"), where("userName.name", "==", name));
    const querySnapshot = await getDocs(q);
    const createdAt = querySnapshot.docs[0].data().createdAt;
    const options = {hour: 'numeric', minute: 'numeric'};
    const now = new Date(createdAt);
    setNowDate(now.toLocaleTimeString(undefined, options));
  }
  fetchData();
}, [name]);

  return (
    <ul>
      <li>
        <Link to="/Chatting " state={{ images, name, id ,city , backImages}}>
          <span className="chats_img empty">
            <img src={images} alt="My Image"></img>
          </span>
          <span className="chats_cont">
            <span className="chats_name">{name}</span>
            <span className="chats_latest">
              <LastMessage
                 talkObj={talks[id] ? talks[id] : null}
                 isOwner={talks[id]?.creatorId === userObj.uid}
                 name={name}
              />
            </span>
          </span>
          <span className="chats_time">
            <span>{nowDate}</span>
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default ChatList;
