import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../fbase";

function StatusMessage({ userObj}) {
  const [myStatus, setMyStatus] = useState("");
  const [status , setStatus] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "statusMessage"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setMyStatus(newArray);
    });
  }, []);

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
      <div className="profileName_wrap">
        <input
          className="profileName"
          type="text"
          onChange={onChange}
          value={status}
          placeholder={status}
        />
        <button type="submit" className="submit_name">
          done
        </button>
      </div>
    </form>
  );
}

export default StatusMessage;