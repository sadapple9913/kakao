import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import {FaPencilAlt } from "react-icons/fa";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, } from "firebase/auth";
import {auth,} from '../fbase'
import Edit from "../components/Edit";
import {db, storage} from '../fbase'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import "../styles/Friends.scss";


function My({userObj , images}) {

    const [myStatus, setMyStatus] = useState("");

    useEffect(() =>{
<<<<<<< HEAD
      if (!userObj) return;
=======
<<<<<<< HEAD
      if (!userObj) return;
=======
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
>>>>>>> 68f18746a111680f3b6a3653ff3d10ed4391bdad
      const q = query(collection(db,"statusMessage"),
      where("creatorId", "==", userObj.uid),orderBy("createdAt" ,"asc"));
      
      const unsubscribe = onSnapshot(q,(querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) =>{
          newArray.push({...doc.data(), id:doc.id});
          console.log("new->",newArray);
        });
        setMyStatus(newArray);
      });
<<<<<<< HEAD
      },[userObj]);
=======
<<<<<<< HEAD
      },[userObj]);
=======
      },[]);
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
>>>>>>> 68f18746a111680f3b6a3653ff3d10ed4391bdad
      

  return (
    <Link to="/MyProfile" images={images} userObj={userObj}>
      <ul>
        <li className="friend_wrap">
          <span class="Profile_img empty">
            <img src={userObj.photoURL} alt="My Image"/>
          </span>
          <span class="Profile_name">{userObj.displayName}</span>
          {myStatus.length > 0 && (
                <span className="statusMessage_my">{myStatus[myStatus.length - 1].statusMessage}</span>
              )}
        </li>
      </ul>
    </Link>
  );
}

export default My;
