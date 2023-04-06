import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import {db, storage} from '../fbase'
import { getDownloadURL, ref, uploadString}  from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import "../styles/Edit.scss";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import ProfileHeader from "./ProfileHeader";
import "../styles/Edit.scss";


function Edit({userObj}) {
const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
console.log(userObj);
const [talks, setTalks] = useState([]);
const[attachment ,setAttachment ] = useState("");
// const [goBack, setGoBack] = useState(false);

// const goBackClick = () => {
//     setGoBack(true);
//   };

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
      photoURL: attachmentUrl /* !== "" ? attachmentUrl : userObj.photoURL, */
    });
  } catch (e) {
    console.error("Error updating profile: ", e);
  }
  setAttachment(userObj.photoURL);
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
    reader.readAsDataURL(theFile); //theFile이라는 값을 U RL로 읽어서 보이게 한다
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
        <img src={userObj.photoURL} alt="Profile image" />
      </section>

        <section className="profile">
          <h2 className="blind">My profile info</h2>
          <div className="Profile_profile_img empty">
            <img src={userObj.photoURL} alt="Profile image" />
            <images />
          </div>
          </section>
          <form onSubmit={onSubmit} className="Edit_container">  
            <input className="profileName" type="text" onChange={onChange} value={newDisplayName} placeholder="Display Name"/>
            <input className="submit_name" type="submit" value="이름" />
            <input className="submit_image" type="submit" value="올리기" />
            <label className="select" htmlFor="attach-file">
            <input className="file" type='file' accept='image/*' onChange={onFileChange} style={{opacity:0}}  id="attach-file"/>
            </label>
            {attachment && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
              <div>
                <img src={attachment} width="50" height="50" alt='' />
                <button className="remove" onClick={onClearAttachment}>x</button>
              </div>
            )}
          </form> 



    </div>
  </div>


  )
}

export default Edit