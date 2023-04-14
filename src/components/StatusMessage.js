import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../fbase";

function StatusMessage({ userObj}) {
  const [myStatus, setMyStatus] = useState("");
  const [status , setStatus] = useState([]);
  useEffect(() => {
<<<<<<< HEAD
    if (!status || !userObj || !userObj.uid) return;
=======
<<<<<<< HEAD
    if (!status || !userObj || !userObj.uid) return;
=======
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
>>>>>>> 68f18746a111680f3b6a3653ff3d10ed4391bdad
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
<<<<<<< HEAD
  }, [status,userObj]);
=======
<<<<<<< HEAD
  }, [status,userObj]);
=======
  }, []);
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
>>>>>>> 68f18746a111680f3b6a3653ff3d10ed4391bdad

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
      <div className="profileName_wrap_edit">
        <div className="statusMessage_wrap">
      {myStatus.length > 0 && (
        <input className="statusMessage_edit" type="text" onChange={onChange} value={status} placeholder={myStatus[myStatus.length - 1].statusMessage}/>
        )}
        <button type="submit" className="submit_name">
          done
        </button>
        </div>
      </div>
    </form>
  );
}

export default StatusMessage;