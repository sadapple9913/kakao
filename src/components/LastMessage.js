import React, { useEffect, useState } from "react";
import "../styles/Chats.scss";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../fbase'

function LastMessage(props) {
  const { chatId, isOwner } = props;
  const [lastTalk, setLastTalk] = useState("");

  useEffect(() => {
    const q = query(collection(db, "talks"), /* where("chatId", "==", chatId),  */orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTalks = {};
      querySnapshot.forEach((doc) => {
        const talk = doc.data();
        const chatId = talk.chatId;
        if (!newTalks[chatId]) {
          newTalks[chatId] = talk;
        }
      });
      setLastTalk(newTalks[chatId]?.text || "");
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return (
    <h4>{lastTalk}</h4>
  )
}

export default LastMessage;