import React, { useState } from "react";
import {Link} from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { storage} from '../fbase'
import { getDownloadURL, ref, uploadString}  from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import "../styles/Edit.scss";
import MyProfile from "../routes/MyProfile";


function Edit({userObj}) {
const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
console.log(userObj);
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
      photoURL: attachmentUrl !== "" ? attachmentUrl : userObj.photoURL,
    });
  } catch (e) {
    console.error("Error updating profile: ", e);
  }
  setAttachment("");
};

  const onFileChange = (e) =>{
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
  
  const onClearAttachment = () =>{
    setAttachment("");
  }
  
  console.log("attachment",attachment);
  console.log("newDisplayName ", newDisplayName )
  
  return (
    
    <>
    

    
    <form onSubmit={onSubmit} className="container">  
    <input className="profileName" type="text" onChange={onChange} value={newDisplayName} placeholder="Display Name"/>
    <input className="submit" type="submit" value="이름" />
    <input className="submit" type="submit" value="올리기" />
    <input className="file" type='file' accept='image/*' onChange={onFileChange} />
    {attachment && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
      <div>
        <img src={attachment} width="50" height="50" alt='' />
        <button className="remove" onClick={onClearAttachment}>x</button>
      </div>
    )}
  </form> 
 
  {/* <button onClick={goBackClick}>돌아가기</button>
 */}

  </>
  )
}

export default Edit