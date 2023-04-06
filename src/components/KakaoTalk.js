import { deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {db,storage} from '../fbase'
import React, { useState } from 'react'
import {ref, deleteObject } from "firebase/storage";
import { FaPen, FaTimes, FaUndoAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function KakaoTalk(props) {
  const {talkObj:{text,id,attachmentUrl},isOwner,} = props;
  const [editing, setEditing] = useState(false);
  const [newTalk , setNewTalk] = useState(text);
  console.log(props);

  const onDeleteClick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
     const data = await deleteDoc(doc(db, "talks", `/${id}`));
     if(attachmentUrl !== ""){
      const desertRef = ref(storage, attachmentUrl);
      await deleteObject(desertRef);
     }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev); //토글기능

  const onChange = (e) =>{
    const{target:{value}} = e;
    setNewTalk(value);
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    const newTalkRef = doc(db, "talks", `/${id}`);

    await updateDoc(newTalkRef, {
      text: newTalk,
      createAt : Date.now(),
    });

    setEditing(false);
    console.log(newTalkRef);
  }

  const [currentTime, setCurrentTime] = useState(new Date());

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();


  return (
    <div>
      {editing ? (
        <>
        <form onSubmit = {onSubmit}>
          <input type='text' onChange={onChange} value={newTalk} required />
          <input type='submit' value="수정" />
          </form > 
          <button onClick={toggleEditing}><FaUndoAlt /></button>

        </>

      ) : (
        <>
        <div className='chat'>
        <Link to="/ChatList" state={{text}} >
          <h4>{text}</h4>
        </Link>
        {attachmentUrl && (
        <img src={attachmentUrl} width="50" height="50" alt=''  />
        )}


        {isOwner && (
          <>
          <button onClick={onDeleteClick}><FaTimes /></button>
          <button onClick={toggleEditing}><FaPen /></button>
          </>
 
        )} 
         </div>
            <span className="chat_time_now">
             {currentHour}:{currentMinute}
            </span>
        </>
      )}
      {/*  */}

    </div> 
  )
}

export default KakaoTalk

