import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../fbase";
import "../styles/StatusMessage.scss"

function StatusMessage({ userObj}) {
  const [myStatus, setMyStatus] = useState("");
  const [status , setStatus] = useState([]);
  useEffect(() => {
    if (!status || !userObj || !userObj.uid) return;
    const q = query(collection(db, "statusMessage"),
    where("creatorId", "==", userObj.uid), 
    orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setMyStatus(newArray);
    });
  }, [status,userObj]);

  const onChange = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setStatus(value);
  };

  const onStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "statusMessage"), {
        createdAt: Date.now(),
        creatorId: userObj.uid,
        statusMessage: status,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form onSubmit={onStatusSubmit}>
      <div className="statusMessage_wrap">
      {myStatus.length > 0 && (
        <input className="statusMessage_edit" type="text" onChange={onChange} placeholder={myStatus[myStatus.length - 1].statusMessage  || "상태메세지를 입력해주세요."}/>
        )}
        <button type="submit" className="submit_name">
          done
        </button>
      </div>
    </form>
  );
}

export default StatusMessage;