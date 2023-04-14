import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import {FaPencilAlt } from "react-icons/fa";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, } from "firebase/auth";
import {auth,} from '../fbase'
import Edit from "../components/Edit";
import {db, storage} from '../fbase'
import "../styles/MyProfile.scss";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";


function MyProfile({userObj}) {

  console.log("user1222->",userObj);
  
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [status ,setStatus ] = useState("");
  const [myStatus, setMyStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };
  
  useEffect(() => {
    if (!userObj) return;
    const photoQ = query(
      collection(db, "photo"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "asc")
    );
  
    const statusQ = query(
      collection(db, "statusMessage"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "asc")
    );
  
    const unsubscribes = [
      onSnapshot(photoQ, (querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id });
        });
        if (newArray.length > 0) {
          const lastBackgroundUrl = newArray[newArray.length - 1].backgroundURL;
          setProfilePhoto(lastBackgroundUrl);
        } else {
          setProfilePhoto("");
        }
      }),
      onSnapshot(statusQ, (querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) => {
          newArray.push({ ...doc.data(), id: doc.id });
        });
        setMyStatus(newArray);
      })
    ];
  
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [userObj]);


  return (
    <>
    {isLoading ? (
      <div>로딩중...</div>
    ) : (
    <div className="profile_wrap">
    <ProfileHeader />

    <div className="profile_main">
    <section className="background">
        <h2 className="blind">My profile background image</h2>
      {profilePhoto && (
        <img src={profilePhoto} alt="Profile image" />
      )}
    </section>

        <section className="profile">
          <h2 className="blind">My profile info</h2>
          <div className="Profile_profile_img empty">
          {userObj.photoURL && (
              <img  src={userObj.photoURL} alt="Profile image" />
            )}
          </div>
          <div className="profile_cont">
            <span className="profile_name">{userObj.displayName}</span>

            {myStatus.length > 0 && (
                <span className="statusMessage">{myStatus[myStatus.length - 1].statusMessage}</span>
              )}
            <Link to="/Edit" userObj={userObj}>
            <ul className="profile_menu">
              <li>
                <span className="icon">
                  <FaPencilAlt />
                </span>
                Edit Profile
              </li>
            </ul>
            </Link>
          </div>
        </section>

      <button className="LogOut" onClick={onLogOutClick}>LogOut</button>
    </div>
  </div>
  )}
  </>
);
}

export default MyProfile;