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
        <form className='fix_container' onSubmit = {onSubmit}>
          <input className='fix_wrap' type='text' onChange={onChange} value={newTalk} required />
          <input className='done' type='submit' value="done" />
          </form > 
          <button className='return' onClick={toggleEditing}><FaUndoAlt /></button>

        </>

      ) : (
        <>
        <div className='chat'>
          <h4>{text}</h4>
        {attachmentUrl && (
        <img src={attachmentUrl} width="50" height="50" alt=''  />
        )}


        {isOwner && (
          <>
          <button className='delelte_btn' onClick={onDeleteClick}><FaTimes /></button>
          <button className='fix_btn' onClick={toggleEditing}><FaPen /></button>
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

