import React, { useEffect, useState } from "react";
import "../styles/Chats.scss";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { db } from '../fbase'

function LastMessage(props) {

  const { chatId, isOwner ,name , userObj } = props;
  const [lastTalk, setLastTalk] = useState("");
  console.log("제발제발",userObj);

  useEffect(() => {
    if (!name) return;
    const q = query(collection(db, "talks"), 
    where("userName.name", "==", name), 
    where("creatorId", "==", userObj.uid),
    orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTalks = {};
      querySnapshot.forEach((doc) => {
        const talk = doc.data();
        const chatId = talk.chatId;
        if (!newTalks[chatId]) {
          newTalks[chatId] = talk;
        }
      });
      setLastTalk(newTalks[chatId]?.text || (newTalks[chatId]?.attachmentUrl &&  <><FontAwesomeIcon className="Icon" icon="fa-solid fa-camera-retro" /> 사진</>));
    });
    return unsubscribe;
  }, [name, chatId, isOwner]);


  return (
    <h4>{lastTalk}</h4>

    
  )
}

export default LastMessage;