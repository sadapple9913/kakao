import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Chats.scss";
import LastMessage from "./LastMessage";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../fbase";


function ChatList({  images, name, id , city , backImages  , userObj}) {

  console.log("1233251",name);
  console.log("userObj아니좀되라 ㅅㅂ->",userObj);
  const [talk, setTalk] = useState("");
  const [talks, setTalks] = useState([]);
  
  const[nowDate , setNowDate] = useState("");

<<<<<<< HEAD
  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(
          collection(db, "talks"),
          where("creatorId", "==", userObj.uid),
          where("userName.name", "==", name)
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs;
        if (docs.length > 0) {
          const createdAt = docs[0].data().createdAt;
          if (createdAt) {
            const options = { hour: 'numeric', minute: 'numeric' };
            const now = new Date(createdAt);
            setNowDate(now.toLocaleTimeString(undefined, options));
          }
        } else {
          console.log("No documents found!");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [name]);
=======
  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(
          collection(db, "talks"),
          where("creatorId", "==", userObj.uid),
          where("userName.name", "==", name)
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs;
        if (docs.length > 0) {
          const createdAt = docs[0].data().createdAt;
          if (createdAt) {
            const options = { hour: 'numeric', minute: 'numeric' };
            const now = new Date(createdAt);
            setNowDate(now.toLocaleTimeString(undefined, options));
          }
        } else {
          console.log("No documents found!");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [name]);
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d

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
                 talkObj={talks[id]}
                 isOwner={talks[id]?.creatorId === userObj.uid}
                 name={name}
                 userObj={userObj}
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
