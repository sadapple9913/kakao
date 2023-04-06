import React, { useEffect, useState } from "react";
import ChattingHeader from "../components/ChattingHeader";
import { FaPlus, FaRegSmileBeam, FaMicrophone } from "react-icons/fa";
import "../styles/Chatting.scss";
import Talk from '../components/KakaoTalk'
import { Link, useLocation } from "react-router-dom";
import { querySnapshot, addDoc, getDocs, onSnapshot, orderBy, query, collection, where  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import {db,storage} from '../fbase'
import {ref, uploadString, getDownloadURL } from "firebase/storage";

function Chatting({ userObj }) {
  const location = useLocation(); //react-router-dom에서 제공하는 함수
  console.log("location ->",location);


  const { name, images, id, city } = location.state;
console.log(city);
  console.log(`userObj->`,userObj);

  const [talk, setTalk] = useState("");
  const [talks, setTalks] = useState([]);
  const[attachment ,setAttachment ] = useState("");

  useEffect(() =>{
    // getTweets();
    const q = query(collection(db,"talks"), where("userName.name", "==", name), orderBy("createdAt" ,"asc"));

      const unsubscribe = onSnapshot(q,(querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) =>{
          newArray.push({...doc.data(), id:doc.id});
          console.log("newA->",newArray);
        });
        setTalks(newArray);
      });
  },[]);

  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setTalk(value);
  };

  let attachmentUrl = ""; 

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); //경로지정
        const response = await uploadString(storageRef, attachment, 'data_url');
        console.log('reponse ->',response)
        attachmentUrl = await getDownloadURL(ref(storage, response.ref));//https:
      }

      const docRef = await addDoc(collection(db, "talks"), {
        text: talk,
        userName:{name},
        createdAt: Date.now(),
        creatorId: userObj.uid, // ID of the logged in user
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTalk("");
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
    reader.readAsDataURL(theFile); //theFile이라는 값을 URL로 읽어서 보이게 한다
  }

  const onClearAttachment = () =>{
    setAttachment("");
  }

  return (
    <div className="Chatting_wrap">
      <ChattingHeader />

      <div className="chatting_main">
        <span className="date_info">{id}</span>

        <div className="chat_box my">
          <span className="chat">{id}</span>
          <span className="chat">Hello! This is a test message.</span>
          <span className="chat">Hello! This is a test message. </span>
          <span className="chat_time">
            <span>15</span>:<span>33</span>
          </span>
        </div>

        <div className="chat_box other">
          <div className="other_info">
              <Link to="/profile" state={{images , name}} >
                <span className="profile_img empty">
                  <img src={images} />
                </span>
              </Link> 
            <span className="profile_name">{name}</span>
          </div>
          <span className="chat">{name}</span>
          <span className="chat">I know you NO.{id}</span>
          <span className="chat">you live in {city}!</span>
          <span className="chat_time">
            <span>17</span>:<span>33</span>
          </span>
        </div>

          <div className="chat_box my">
                    {talks.map(talk => (
                            <Talk
                              key={talk.id} 
                              talkObj={talk}
                              isOwner={talk.creatorId === userObj.uid}
                              />
                          ))}

                          {attachment && ( //값이 있으면 true 다, 0 null 공백문자 undefind = false
                          <div>
                            <img src={attachment} width="50" height="50" alt='' />
                            <button onClick={onClearAttachment}>remove</button>
                          </div>
                        )}
                        {attachmentUrl && (
                        <img src={attachmentUrl} width="50" height="50" alt=''  />
                        )}

            {/* <span className="chat_time">
              <span>15</span>:<span>33</span>
            </span> */}
          </div>


        <footer>
          <span className="plus_btn">
            <a href="#">
              <FaPlus />
            </a>
          </span>
          <form action="/" method="post" className="from" onSubmit={onSubmit}>
            <fieldset className="text_box">
              <legend className="blind">채팅입력창</legend>
                <input
                  type='text'
                  value={talk}
                  onChange={onChange}
                  placeholder=""
                />
                <input type='file' accept='image/*' onChange={onFileChange} />
                <input type='submit' value={'send'} />
            </fieldset>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default Chatting;
