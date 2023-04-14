import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import {db, storage} from '../fbase'
import { getDownloadURL, ref, uploadString}  from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileHeader from "./ProfileHeader";
import "../styles/Edit.scss";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import StatusMessage from "./StatusMessage";


function Edit({userObj}) {
const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
console.log(userObj);

const [attachment ,setAttachment ] = useState("");
const [background ,setBackground ] = useState("");

const [profilePhoto, setProfilePhoto] = useState("");

const navigate = useNavigate();

useEffect(() =>{
<<<<<<< HEAD
  if (!userObj) return;
=======
  // getTweets();
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
  const q = query(collection(db,"photo"),
  where("creatorId", "==", userObj.uid),
  orderBy("createdAt" ,"asc"));

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) =>{
        newArray.push({...doc.data(), id:doc.id});
        console.log("newA->",newArray);
      });
      if (newArray.length > 0) { // 배열이 비어있는 경우 체크
        const lastBackgroundUrl = newArray[newArray.length - 1].backgroundURL;
        setProfilePhoto(lastBackgroundUrl);
      } else {
        setProfilePhoto(""); // 비어있는 경우 빈 문자열("")을 상태값으로 설정
      }
    });
<<<<<<< HEAD
},[userObj]);
=======
},[]);
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d

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
      const response = await uploadString(storageRef, attachment ,"data_url");
      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
    }
    await updateProfile(userObj, {
      displayName: newDisplayName,
       photoURL:attachmentUrl !== "" ? attachmentUrl : userObj.photoURL,
    });

  } catch (e) {
    console.error("Error updating profile: ", e);
  }
  setAttachment("");
};


const onPhotoSubmit = async (e) => {
  e.preventDefault();
  let backgroundURL = "";
  try {
    const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(storageRef, background ,"data_url");
    backgroundURL = await getDownloadURL(ref(storage, response.ref));  
    const docRef = await addDoc(collection(db, "photo"), {
      createdAt: Date.now(),
      creatorId: userObj.uid, 
      backgroundURL: backgroundURL !== "" ? backgroundURL : backgroundURL
    });
    setBackground("");
  } catch (e) {
    console.error("Error updating profile: ", e);
  }
   // setBackground("");
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

  const onPhotoFileChange = (e) =>{
    e.preventDefault();
    console.log('e->',e);
    const {target:{files}} = e;
  
    const theFile = files[0];
    console.log('theFile->',theFile);
  
    const reader = new FileReader(); //브라우저에 사진미리보기를 하고싶으면 FileReader를 사용해야된다
    reader.onloadend = (finishedEvent) => {
      console.log("finishedEvent ->" ,finishedEvent);
      const {currentTarget:{result}} = finishedEvent
      console.log('123->',result);
      setBackground(result);
    }
    reader.readAsDataURL(theFile); //theFile이라는 값을 URL로 읽어서 보이게 한다
  }

  const onClearAttachment = (e) =>{
    e.preventDefault();
    setAttachment("");
  
  }

  const onClearBackground = (e) =>{
    e.preventDefault();
    setBackground("");
  
  }
  
  console.log("attachment",attachment);
  console.log("newDisplayName ", newDisplayName )
  console.log("background",background);

  return (
    <div className="profile_wrap">
    <ProfileHeader />

    <div className="profile_main">
      <section className="background">
        <h2 className="blind">My profile background image</h2>
<<<<<<< HEAD
        {profilePhoto && (
        <img src={profilePhoto} alt="background image" />
        )}
=======
        <img src={profilePhoto} alt="background image" />
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
        <from onSubmit={onPhotoSubmit} className="photoProfile" >
          <label className="photoSelect" htmlFor="attach-photofile">
          <span className="Icon_wrap">
          <FontAwesomeIcon className="Icon" icon="fa-solid fa-camera-retro" />
          <input className="photofile" type='file' accept='image/*' onChange={onPhotoFileChange} style={{opacity:0}}  id="attach-photofile"/>
          </span>
        </label>
        </from>
      </section>

      <section className="profile">
          <h2 className="blind">My profile info</h2>
          <div className="Profile_profile_img empty">
<<<<<<< HEAD
            {userObj.photoURL && (
            <img src={userObj.photoURL} alt="Profile image" />
            )}
=======
            <img src={userObj.photoURL} alt="Profile image" />
            <images />
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
          </div>
          </section>

      <form onSubmit={onSubmit}>  
   
            <div className="profileName_wrap_edit">
            <input className="profileName" type="text" onChange={onChange} value={newDisplayName} placeholder={newDisplayName}/>
            <button type="submit" className="submit_name">
<<<<<<< HEAD
=======
            {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
            done
            </button>
            </div>

            <label className="select" htmlFor="attach-file">
              <span className="Icon_wrap">
              <FontAwesomeIcon className="Icon" icon="fa-solid fa-camera-retro" />
              </span>
            <input className="file" type='file' accept='image/*' onChange={onFileChange} style={{opacity:0}}  id="attach-file"/>
            </label>
      </form> 

      <StatusMessage userObj={userObj}/>
          
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

              {background && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
              <div className="preview">
                <img src={background} alt='' />
                <button className="remove" onClick={onClearBackground}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
                <form onSubmit={onPhotoSubmit}>
                <input className="submit_image" type="submit" value="done" />
                </form>

              </div>
            )}
    </div>
  </div>


  )
}

export default Edit