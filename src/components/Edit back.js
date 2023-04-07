import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import {db, storage} from '../fbase'
import { getDownloadURL, ref, uploadString}  from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
// import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileHeader from "./ProfileHeader";
import "../styles/Edit.scss";
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";


function Edit({userObj}) {
const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
console.log(userObj);
const [talks, setTalks] = useState([]);
const [attachment ,setAttachment ] = useState("");
const navigate = useNavigate();

useEffect(() =>{
  // getTweets();
  const q = query(collection(db,"talks"), where("userObj", "==", attachment), orderBy("createdAt" ,"asc"));

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) =>{
        newArray.push({...doc.data(), id:doc.id});
        console.log("newA->",newArray);
      });
      setTalks(newArray);
    });
},[]);

  const onChange = (e) =>{
    e.preventDefault();
    const { target: { value } } = e;
    setNewDisplayName(value);
    console.log(value)
    }
  
   const onSubmit = async (e) => {
  e.preventDefault();
  try {
    let attachmentUrl = "";
    if (attachment !== "") {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
    }
    await updateProfile(userObj, {
      displayName: newDisplayName,
      photoURL: attachmentUrl !== "" ? attachmentUrl : userObj.photoURL,
      

    });
  } catch (e) {
    console.error("Error updating profile: ", e);
  }
  setAttachment("");
};


  const onFileChange = (e) =>{
    e.preventDefault();
    console.log('e->',e);
    const {target:{files}} = e;
  
    const theFile = files[0];
    console.log('theFile->',theFile);
  
    const reader = new FileReader(); //브라우저에 사진미리보기를 하고싶으면 FileReader를 사용해야된다
    reader.onloadend = (finishedEvent) => {
      console.log("finishedEvent ->" ,finishedEvent);
      const {currentTarget:{result}} = finishedEvent
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); //theFile이라는 값을 URL로 읽어서 보이게 한다
  }
  
  const onClearAttachment = (e) =>{
    e.preventDefault();
    setAttachment("");
  }
  
  console.log("attachment",attachment);
  console.log("newDisplayName ", newDisplayName )
  

  return (
    <div className="profile_wrap">
    <ProfileHeader />

    <div className="profile_main">
      <section className="background">
        <h2 className="blind">My profile background image</h2>
        <img src={userObj.photoURL} alt="background image" />
      </section>
        <section className="profile">
          <h2 className="blind">My profile info</h2>
          <div className="Profile_profile_img empty">
            <img src={userObj.photoURL} alt="Profile image" />
            <images />
          </div>
          </section>
          <form onSubmit={onSubmit}>  

            <div className="profileName_wrap">
            <input className="profileName" type="text" onChange={onChange} value={newDisplayName} placeholder={newDisplayName}/>
            <button type="submit" className="submit_name">
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </button>
            </div>

            <label className="select" htmlFor="attach-file">
              <span className="Icon_wrap">
              <FontAwesomeIcon className="Icon" icon="fa-solid fa-camera-retro" />
              </span>
            <input className="file" type='file' accept='image/*' onChange={onFileChange} style={{opacity:0}}  id="attach-file"/>
            </label>

            
          </form> 
          
          <button className="back_button" onClick={() => navigate(-1)}>Back</button>



          {attachment && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
              <div className="preview">
                <img src={attachment} alt='' />
                <button className="remove" onClick={onClearAttachment}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
                <form onSubmit={onSubmit}>
                <input className="submit_image" type="submit" value="done" />
                </form>

              </div>
            )}
    </div>
  </div>


  )
}

export default Edit