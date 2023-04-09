import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Chats.scss";
import LastMessage from "./LastMessage";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../fbase";


function ChatList({ images,name, id , city , backImages},userObj) {


  const [talk, setTalk] = useState("");
  const [talks, setTalks] = useState([]);

  // const q = query(collection(db, "talks"),/*  where("userName.name", "==", name), */ orderBy("createdAt", "desc"));
  // console.log(name)
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const newTalks = {};
  //   querySnapshot.forEach((doc) => {
  //     const talk = doc.data();
  //     const chatId = talk.chatId;
  //     if (!newTalks[chatId]) {
  //       newTalks[chatId] = talk;
  //     }
  //   });
  //   setTalks(newTalks);
  // });


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
              />
            </span>
          </span>
          <span className="chats_time">
            <span>15</span>:<span>33</span>
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default ChatList;
