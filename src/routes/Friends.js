import React, { useEffect, useState } from "react";
import Header from '../components/Header'
import Tab from '../components/Tab'
import {FaSistrix } from "react-icons/fa";
import My from '../components/My'
import User from '../components/User'
import profiles from '../data/profiles.json'
import axios from 'axios';
import '../styles/Friends.scss'
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import {db ,auth} from '../fbase'
import { update } from "firebase/database";
import KakaoTalk from "../components/KakaoTalk";
import { UpdateData } from "firebase/firestore";
import {async} from "@firebase/util"


function Friends({userObj}) {
  const [talks , setTalks] = useState([]);
  const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
  console.log(userObj);
  const[attachment ,setAttachment ] = useState("");
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const datas = response.data
    setDatas(datas);
    console.log("datas->",datas); // log the updated data
  }

  const profilesImages = profiles.map((profile) => profile.images);
  const datasNamesIds = datas.map((profile) => ({
    id: profile.id,
    name: profile.name,
    city: profile.address.city,
    username: profile.username,
  }));
  
  const combinedProfiles = profilesImages.map((image, index) => ({
    ...datasNamesIds[index],
    images: image,
    backImages: profiles[index].backImages
  }));


const onLogOutClick = () => {
  signOut(auth);
  navigate("/", { replace: true });
};

useEffect(() =>{
  const q = query(collection(db, "talks"), where("creatorId", "==", userObj.uid),orderBy("createdAt" ,"desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newArray = [];
    querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
    });
    setTalks(newArray);
  });
},[])


const onChange = (e) =>{
  e.preventDefault();
  const { target: { value } } = e;
  setNewDisplayName(value);
  console.log(value)
  }


const onSubmit = async(e) => {
e.preventDefault();
if(userObj.displayName !== newDisplayName){
  await updateProfile(userObj, {
    displayName: newDisplayName ,
    photoUrl: attachment });
}}

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
    <div className="friend_wrap">

      <Header />

      <main className="main">
        {/* search_box */}
        <form className="search_box">
          <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <FaSistrix />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Find firends , chats , Plus Friends"
            />
          </fieldset>
        </form>
        {/* //search_box */}
        {/* main_section */}
        <section class="main_section">
        <h2>My Profile</h2>
        <My 
          images={userObj.photoURL}
          userObj={userObj}
        />
     </section>
            <section className="main_section">
            <h2>Friends</h2>
            <ul>
              <li className="Friend_wrap">
              {combinedProfiles.slice(0, 10).map((profile) => (
                  <User
                    name={profile.name}
                    id={profile.id}
                    images={profile.images}
                    city={profile.city}
                    username={profile.username}
                    backImages={profile.backImages}
                  />
                ))}

              </li>
            </ul>
          </section>

        {/* //main_section */}
      </main>

      <Tab />
    </div>
  );
}


export default Friends