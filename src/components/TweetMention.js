import { deleteDoc, doc } from 'firebase/firestore';
import {db} from '../fbase'
import React, { useState } from 'react'

function Tweet(props) {
  const {tweetObj:{text,id},isOwner} = props;
  const [editing, setEditing] = useState(false);

  const onDeleteClick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
     const data = await deleteDoc(doc(db, "tweets", `/${id}`));
    }
  }

  const toggleEditing = () => setEditing((prev) =>!prev); //토글기능


  return (
    <div>
      {editing ? (
        <>
        
        </>

      ) : (

        <>
        <h4>{text}</h4>
        {isOwner && (
          <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button onClick={toggleEditing}>Edit Tweet</button>
          </>
 
        )}
         </>
      )}
      

    </div> 
  )
}

export default Tweet